// import { NextResponse } from "next/server";
// import { ai } from "../generate-course/route";

// const PROMPT = `Depends on the chapter name and topic, generate content for each topic in HTML and give the response in JSON format.
// Schema: {
// chapterName: <>,
// {
// topic:<>,
// content: <>,
// }
// }
// : User Intput:
// `;

// export async function POST(req) {
//   const { courseJson, courseTitle, courseId } = await req.json();

//   console.log("Received data:", { courseJson, courseTitle, courseId });

//   const promises = courseJson?.chapters?.map(async (chapter) => {
//     const config = {
//       responseMimeType: "text/plain",
//     };
//     const model = "gemini-1.5-flash";
//     const contents = [
//       {
//         role: "user",
//         parts: [
//           {
//             text: PROMPT + JSON.stringify(chapter),
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
//       // Handle cases where it's just ``` without json
//       jsonString = jsonString.replace(/^```\s*/g, "");
//       jsonString = jsonString.replace(/```\s*$/g, "");
//     }

//     // Trim any extra whitespace
//     jsonString = jsonString.trim();

//     console.log("Cleaned JSON string:", jsonString);

//     const JSONResp = JSON.parse(jsonString);

//     // GET Youtue Videos Later
//     return JSONResp;
//   });
//   const CourseContent = await Promise.all(promises);
//   return NextResponse.json({
//     courseName: courseTitle,
//     courseContent: CourseContent,
//   });
// }

import { NextResponse } from "next/server";
import { ai } from "../generate-course/route";
import axios from "axios";
import { title } from "process";
import { coursesTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const PROMPT = `Generate content for each topic in HTML format. Return ONLY a valid JSON response with no markdown formatting or code blocks.
Schema: {
  "chapterName": "<chapter name>",
  "chapters": [
    {
      "topic": "<topic name>",
      "content": "<HTML content as a single line with proper escaping>"
    }
  ]
}

User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  console.log("Received data:", { courseJson, courseTitle, courseId });

  const promises = courseJson?.chapters?.map(async (chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-1.5-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + JSON.stringify(chapter),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log("Raw response:", response.candidates[0].content.parts[0].text);

    const rawResp = response?.candidates[0]?.content?.parts[0]?.text;

    // Clean the response string
    let jsonString = rawResp
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[\r\n\t]/g, " ") // Replace newlines and tabs with spaces
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();

    console.log("Cleaned JSON string:", jsonString);

    const JSONResp = JSON.parse(jsonString);

    //GET YOUTUBE VIDEOS
    const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
    console.log({ youtubeVideo: youtubeData, courseData: JSONResp });
    return {
      youtubeVideo: youtubeData,
      courseData: JSONResp,
    };
  });

  const CourseContent = await Promise.all(promises);

  // Saving to DB
  const dbResp = await db
    .update(coursesTable)
    .set({
      courseContent: CourseContent,
    })
    .where(eq(coursesTable.cid, courseId));

  return NextResponse.json({
    courseName: courseTitle,
    courseContent: CourseContent,
  });
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResult: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };
  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListResp = resp.data.items;
  const youtubeVideoList = [];
  youtubeVideoListResp.forEach((item) => {
    const data = {
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    };
    youtubeVideoList.push(data);
  });
  console.log("Youtube Video List:", youtubeVideoList);

  return youtubeVideoList;
};
