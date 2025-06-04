// "use client"
// import AppHeader from '@/app/workspace/_components/AppHeader'
// import React, { useEffect, useState } from 'react'
// import ChapterListSidebar from '../_components/ChapterListSidebar'
// import ChapterContent from '../_components/ChapterContent'
// import axios from 'axios'
// import { useParams } from 'next/navigation'

// function Course() {

//     const { courseId } = useParams()
//     const [courseInfo, setCourseInfo] = useState()


//     useEffect(() => {
//         GetEnrolledCourseById()
//     }, [])

//     const GetEnrolledCourseById = async () => {
//         const result = await axios.get('/api/enroll-course?courseId=' + courseId)
//         console.log("ENROLL DATA🍀:", result.data)
//         setCourseInfo(result.data)
//     }

//     return (
//         <div>
//             <AppHeader hideSidebar={true} />
//             <div className='flex gap-10'>
//                 <ChapterListSidebar courseInfo={courseInfo} />
//                 <ChapterContent courseInfo={courseInfo} refreshData={() => GetEnrolledCourseById} />
//             </div>
//         </div>
//     )
// }

// export default Course




"use client";
import AppHeader from '@/app/workspace/_components/AppHeader';
import React, { useEffect, useState, useCallback } from 'react';
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState(null);

    const GetEnrolledCourseById = useCallback(async () => {
        try {
            const result = await axios.get('/api/enroll-course?courseId=' + courseId);
            console.log("ENROLL DATA🍀:", JSON.stringify(result.data, null, 2));
            setCourseInfo({ ...result.data }); // New object reference
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    }, [courseId]);

    useEffect(() => {
        GetEnrolledCourseById();
    }, [GetEnrolledCourseById]);

    if (!courseInfo) {
        return <div>Loading course data...</div>;
    }

    return (
        <div>
            <AppHeader hideSidebar={true} />
            <div className='flex my-3'>

                <Link href={'/workspace'}><Button>Work Space</Button> </Link>
            </div>
            <div className='flex gap-10'>
                <ChapterListSidebar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} refreshData={GetEnrolledCourseById} />
            </div>
        </div>
    );
}

export default Course;