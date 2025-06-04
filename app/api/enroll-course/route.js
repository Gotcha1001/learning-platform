// import { db } from "@/config/db";
// import { coursesTable, enrollCourseTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { and, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { courseId } = await req.json();
//   const user = await currentUser();

//   // Check if the course is already enrolled
//   const enrollCourses = await db
//     .select()
//     .from(enrollCourseTable)
//     .where(
//       and(
//         eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress),
//         eq(coursesTable.cid, courseId)
//       )
//     );
//   if (enrollCourses?.length == 0) {
//     const result = await db
//       .insert(enrollCourseTable)
//       .values({
//         cid: courseId,
//         userEmail: user.primaryEmailAddress?.emailAddress,
//       })
//       .returning(enrollCourseTable);

//     return NextResponse.json(result);
//   }
//   return NextResponse.json({ resp: "Already Enrolled" });
// }
import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Verify course exists
    const courseExists = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));
    if (courseExists.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if the course is already enrolled
    const enrollCourses = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(
          eq(
            enrollCourseTable.userEmail,
            user.primaryEmailAddress.emailAddress
          ),
          eq(enrollCourseTable.cid, courseId) // Fixed: Use enrollCourseTable.cid
        )
      );

    if (enrollCourses?.length === 0) {
      const result = await db
        .insert(enrollCourseTable)
        .values({
          cid: courseId,
          userEmail: user.primaryEmailAddress.emailAddress,
        })
        .returning();

      return NextResponse.json(result);
    }
    return NextResponse.json({ resp: "Already Enrolled" });
  } catch (error) {
    console.error("Enrollment API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const user = await currentUser();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          ),
          eq(enrollCourseTable.cid, courseId)
        )
      );
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  }
}

// export async function PUT(req) {
//   const { completedChapter, courseId } = await req.json();
//   const user = await currentUser();

//   const result = await db
//     .update(enrollCourseTable)
//     .set({
//       completedChapters: completedChapter,
//     })
//     .where(
//       and(
//         eq(enrollCourseTable.cid, courseId),
//         eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
//       )
//     )
//     .returning(enrollCourseTable);

//   return NextResponse.json(result);
// }

//DOESNT MATCH WITH THE FRONT END MARKED AS COMPLETED
// export async function PUT(req) {
//   const { completedChapter, courseId } = await req.json();
//   const user = await currentUser();

//   try {
//     // Fetch the existing enrollment record
//     const existingEnrollment = await db
//       .select()
//       .from(enrollCourseTable)
//       .where(
//         and(
//           eq(enrollCourseTable.cid, courseId),
//           eq(
//             enrollCourseTable.userEmail,
//             user?.primaryEmailAddress.emailAddress
//           )
//         )
//       )
//       .limit(1);

//     // Get the current completed chapters or initialize as empty array
//     let currentCompletedChapters =
//       existingEnrollment[0]?.completedChapters ?? [];

//     // Merge new completed chapters, ensuring uniqueness
//     const updatedCompletedChapters = [
//       ...new Set([...currentCompletedChapters, ...completedChapter]),
//     ];

//     // Update the database with the merged, unique chapters
//     const result = await db
//       .update(enrollCourseTable)
//       .set({
//         completedChapters: updatedCompletedChapters,
//       })
//       .where(
//         and(
//           eq(enrollCourseTable.cid, courseId),
//           eq(
//             enrollCourseTable.userEmail,
//             user?.primaryEmailAddress.emailAddress
//           )
//         )
//       )
//       .returning(enrollCourseTable);

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error updating completed chapters:", error);
//     return NextResponse.json(
//       { error: "Failed to update completed chapters" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req) {
  const { completedChapter, courseId } = await req.json();
  const user = await currentUser();

  console.log("🔍 API DEBUG - Received data:");
  console.log("   - courseId:", courseId);
  console.log("   - completedChapter:", completedChapter);
  console.log("   - user email:", user?.primaryEmailAddress.emailAddress);

  try {
    const existingEnrollment = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(
          eq(enrollCourseTable.cid, courseId),
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          )
        )
      )
      .limit(1);

    console.log("🔍 API DEBUG - Existing enrollment:", existingEnrollment[0]);

    let currentCompletedChapters =
      existingEnrollment[0]?.completedChapters ?? [];

    console.log(
      "🔍 API DEBUG - Current completed chapters:",
      currentCompletedChapters
    );

    // Use the completedChapter array directly (since frontend sends the full updated array)
    const updatedCompletedChapters = Array.isArray(completedChapter)
      ? completedChapter
      : [...currentCompletedChapters, completedChapter];

    console.log(
      "🔍 API DEBUG - Updated completed chapters:",
      updatedCompletedChapters
    );

    const result = await db
      .update(enrollCourseTable)
      .set({
        completedChapters: updatedCompletedChapters,
      })
      .where(
        and(
          eq(enrollCourseTable.cid, courseId),
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          )
        )
      )
      .returning(enrollCourseTable);

    console.log("✅ API DEBUG - Final result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error updating completed chapters:", error);
    return NextResponse.json(
      { error: "Failed to update completed chapters" },
      { status: 500 }
    );
  }
}
