// import { db } from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { GoogleGenAI } from "@google/genai";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { courseId, ...formData } = await req.json();
//     const user = await currentUser();

//     // Define PROMPT inside the POST handler where formData is available
//     const PROMPT = `Generate a learning course based on the following specifications. Ensure the output is in JSON format only, adhering to the provided schema.
// For each course, include:
// Course Name
// Course Description
// Chapter Names
// An image prompt for each chapter to be used in the course banner (in 3D format). The image prompt should:
// Create a modern, flat-style 2D digital illustration representing the user's topic.
// Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools.
// Add symbolic elements related to the course (e.g., sticky notes, design components, visual aids).
// Use a vibrant color palette (blues, purples, oranges) with a clean, professional look.
// Convey a creative, tech-savvy, and educational tone, ideal for visualizing concepts in the course.
// Topics covered under each chapter
// Duration for each chapter
// {
// "course": {
// "name": "string",
// "description": "string",
// "category": "string",
// "level": "string",
// "includeVideo": "boolean",
// "noOfChapters": "number",
// "chapters": [
// {
// "chapterName": "string",
// "duration": "string",
// "topics": [
// "string"
// ],
// "imagePrompt": "string"
// }
// ]
// }
// }
// , User Input: ${formData.topic || "Python"}, ${
//       formData.noOfChapters || 4
//     } Chapters`;

//     const config = {
//       responseMimeType: "text/plain",
//     };

//     const model = "gemini-1.5-flash";
//     const contents = [
//       {
//         role: "user",
//         parts: [
//           {
//             text: PROMPT,
//           },
//         ],
//       },
//     ];

//     const response = await ai.models.generateContent({
//       model,
//       config,
//       contents,
//     });

//     console.log("Raw response:", response.candidates[0].content.parts[0].text);

//     const rawResp = response?.candidates[0]?.content?.parts[0]?.text;

//     // More robust JSON extraction
//     let jsonString = rawResp;

//     // Remove markdown code blocks properly
//     if (jsonString.includes("```json")) {
//       jsonString = jsonString.replace(/```json\s*/g, "");
//       jsonString = jsonString.replace(/```\s*$/g, "");
//     } else if (jsonString.includes("```")) {
//       jsonString = jsonString.replace(/^```\s*/g, "");
//       jsonString = jsonString.replace(/```\s*$/g, "");
//     }

//     // Trim any extra whitespace
//     jsonString = jsonString.trim();

//     console.log("Cleaned JSON string:", jsonString);

//     const JSONResp = JSON.parse(jsonString);

//     const ImagePrompt = JSONResp.course?.chapters?.[0]?.imagePrompt;

//     // Generate Image as well before we save it
//     const bannerImageUrl = await GenerateImage(ImagePrompt);

//     // Save to the Database
//     const result = await db.insert(coursesTable).values({
//       name: JSONResp.course.name || formData.name || "Python Course",
//       description:
//         JSONResp.course.description ||
//         formData.description ||
//         "A comprehensive beginner's course to mastering Python.",
//       category: JSONResp.course.category || formData.category || "Programming",
//       level: JSONResp.course.level || formData.level || "Beginner",
//       includeVideo:
//         JSONResp.course.includeVideo ?? formData.includeVideo ?? true,
//       noOfChapters: JSONResp.course.noOfChapters || formData.noOfChapters || 4,
//       courseJson: JSONResp,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       cid: courseId,
//       bannerImageUrl: bannerImageUrl,
//     });

//     return NextResponse.json({ courseId: courseId });
//   } catch (error) {
//     console.error("Error in generate-course API:", error);
//     return NextResponse.json(
//       { error: "Failed to generate course", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// const GenerateImage = async (imagePrompt) => {
//   const BASE_URL = "https://aigurulab.tech";
//   const result = await axios.post(
//     BASE_URL + "/api/generate-image",
//     {
//       width: 1024,
//       height: 1024,
//       input: imagePrompt,
//       model: "flux",
//       aspectRatio: "16:9",
//     },
//     {
//       headers: {
//         "x-api-key": process?.env?.AI_GURU_LAB_API,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   console.log(result.data.image);
//   return result.data.image;
// };
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    const { has } = await auth();
    const hasPremiumAccess = has({ plan: "starter" });

    const PROMPT = `Generate a learning course based on the following specifications. Ensure the output is in JSON format only, adhering to the provided schema.
For each course, include:
Course Name
Course Description
Chapter Names
An image prompt for each chapter to be used in the course banner (in 3D format). The image prompt should:
Create a modern, flat-style 2D digital illustration representing the user's topic.
Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools.
Add symbolic elements related to the course (e.g., sticky notes, design components, visual aids).
Use a vibrant color palette (blues, purples, oranges) with a clean, professional look.
Convey a creative, tech-savvy, and educational tone, ideal for visualizing concepts in the course.
Topics covered under each chapter
Duration for each chapter
{
"course": {
"name": "string",
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean",
"noOfChapters": "number",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
],
"imagePrompt": "string"
}
]
}
}
User Input:
Course Name: ${formData.name}
Description: ${formData.description}
Category: ${formData.category}
Level: ${formData.level}
Include Video: ${formData.includeVideo}
Number of Chapters: ${formData.noOfChapters}`;

    const config = {
      responseMimeType: "text/plain",
    };

    const model = "gemini-1.5-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT,
          },
        ],
      },
    ];

    //Check if user has already created any course?
    if (!hasPremiumAccess) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(
          eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress)
        );

      if (result?.length >= 1) {
        return NextResponse.json({ resp: "limit exceed" });
      }
    }

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log("Raw response:", response.candidates[0].content.parts[0].text);
    let rawResp = response?.candidates[0]?.content?.parts[0]?.text;

    // Clean the markdown formatting if present
    if (rawResp.includes("```json")) {
      rawResp = rawResp.replace(/```json\s*/g, "").replace(/```\s*$/g, "");
    } else if (rawResp.includes("```")) {
      rawResp = rawResp.replace(/^```\s*/g, "").replace(/```\s*$/g, "");
    }
    rawResp = rawResp.trim();

    console.log("Cleaned JSON string:", rawResp);
    const JSONResp = JSON.parse(rawResp);

    const ImagePrompt = JSONResp.course?.chapters?.[0]?.imagePrompt;
    const bannerImageUrl = await GenerateImage(ImagePrompt);

    await db.insert(coursesTable).values({
      name: JSONResp.course.name || formData.name || "Python Course",
      description:
        JSONResp.course.description ||
        formData.description ||
        "A comprehensive beginner's course to mastering Python.",
      category: JSONResp.course.category || formData.category || "Programming",
      level: JSONResp.course.level || formData.level || "Beginner",
      includeVideo:
        JSONResp.course.includeVideo ?? formData.includeVideo ?? true,
      noOfChapters: JSONResp.course.noOfChapters || formData.noOfChapters || 4,
      courseJson: JSONResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl: bannerImageUrl,
    });

    return NextResponse.json({ courseId: courseId });
  } catch (error) {
    console.error("Error in generate-course API:", error);
    return NextResponse.json(
      { error: "Failed to generate course", details: error.message },
      { status: 500 }
    );
  }
}

const GenerateImage = async (imagePrompt) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process?.env?.AI_GURU_LAB_API,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(result.data.image);
  return result.data.image;
};
