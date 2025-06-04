// import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
// import { Button } from '@/components/ui/button'
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'
// import axios from 'axios'
// import { CheckCircle, Cross, X } from 'lucide-react'
// import { useParams } from 'next/navigation'
// import React, { useContext } from 'react'
// import YouTube from 'react-youtube'
// import { toast } from 'sonner'

// function ChapterContent({ courseInfo, refreshData }) {

//     const { courseId } = useParams()

//     const { courses, enrollCourse } = courseInfo || {}
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo

//     // const topics = courseContent?.[selectedChapterIndex]?.contentData

//     const topics = courseContent?.[selectedChapterIndex]?.courseData?.chapters

//     let completedChapter = enrollCourse?.completedChapter ?? [];

//     const markChapterCompleted = async () => {
//         completedChapter.push(selectedChapterIndex)
//         const result = await axios.put('/api/enroll-course', {
//             courseId: courseId,
//             completedChapter: completedChapter
//         })
//         console.log(result)
//         refreshData()
//         toast.success('Chapter Marked Completed')
//     };


//     const markInCompleteChapter = async () => {
//         const completedChap = completedChapter.filter(item => item != selectedChapterIndex)
//         const result = await axios.put('/api/enroll-course', {
//             courseId: courseId,
//             completedChapter: completedChap
//         })
//         console.log(result)
//         refreshData()
//         toast.success('Chapter Marked InCompleted')
//     };



//     return (
//         <div className='p-10 mt-20'>
//             <div className='flex justify-between items-center'>
//                 <h2 className='font-bold text-3xl gradient-title'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
//                 {!completedChapter?.includes(selectedChapterIndex) ? <Button
//                     onClick={() => markChapterCompleted()}
//                     variant="sex2"> <CheckCircle />Mark As Completed</Button> :
//                     <Button onClick={markInCompleteChapter} variant="outline"> <X /> Mark Incomplete</Button>}
//             </div>


//             <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                 {
//                     videoData?.map((video, index) => index < 4 && (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className="rounded-lg overflow-hidden shadow-md">
//                                 <YouTube
//                                     videoId={video?.videoId}
//                                     opts={{
//                                         height: '250',
//                                         width: '400',
//                                     }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 }
//             </div>

//             <div className='mt-7'>
//                 {Array.isArray(topics) && topics.length > 0 ? (
//                     topics.map((topic, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='mt-10 p-5 bg-indigo-100 rounded-lg'>
//                                 <h2 className='font-bold text-2xl gradient-title'>{index + 1}. {topic?.topic}</h2>
//                                 <div
//                                     dangerouslySetInnerHTML={{ __html: topic?.content }}
//                                     style={{ lineHeight: '2.5' }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 ) : (
//                     <p className="text-white italic mt-4">No topics available for this chapter.</p>
//                 )}

//             </div>
//         </div >
//     )
// }

// export default ChapterContent



//////////////THIS IS THE CURRENT ONE WE WORKING ON 
import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap';
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Loader, Loader2, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
    const { courseId } = useParams();
    const { courses, enrollCourse } = courseInfo || {};
    const courseContent = courseInfo?.courses?.courseContent;

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);


    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.chapters;
    const [renderKey, setRenderKey] = useState(0); // State to force re-render
    const [loading, setLoading] = useState(false)

    // Debug logs
    console.log("🔍 DEBUG - enrollCourse:", enrollCourse);
    console.log("🔍 DEBUG - selectedChapterIndex:", selectedChapterIndex);
    console.log("🔍 DEBUG - selectedChapterIndex type:", typeof selectedChapterIndex);
    console.log("🔍 DEBUG - courseContent:", courseContent);

    // Log detailed structure for index 3 and re-render
    useEffect(() => {
        console.log("🔄 EFFECT - Rendering ChapterContent with selectedChapterIndex:", selectedChapterIndex);
        console.log("🔄 EFFECT - courseContent:", courseContent);
        if (courseContent && selectedChapterIndex === 3) {
            console.log("🔍 DEBUG - courseContent[3] structure:", JSON.stringify(courseContent[3], null, 2));
        }
        setRenderKey(prev => prev + 1); // Force re-render on index change
    }, [selectedChapterIndex, courseContent]);

    // Loading state
    if (!courseContent || courseContent.length === 0) {
        return <div>Loading course content...</div>;
    }

    // Get completed chapters
    const completedChapters = enrollCourse?.completedChapters ?? enrollCourse?.completedChapter ?? [];
    console.log("🔍 DEBUG - completedChapters:", completedChapters);
    console.log("🔍 DEBUG - completedChapters type:", typeof completedChapters);

    const markChapterCompleted = async () => {
        setLoading(true)
        const updatedCompletedChapters = completedChapters.includes(selectedChapterIndex)
            ? completedChapters
            : [...completedChapters, selectedChapterIndex];

        try {
            const result = await axios.put('/api/enroll-course', {
                courseId: courseId,
                completedChapter: updatedCompletedChapters,
            });
            console.log("UPDATED:", result.data);
            refreshData();
            toast.success("Chapter Marked As Completed");
            setLoading(false)
        } catch (error) {
            console.error("Error marking chapter as completed:", error);
            toast.error("Failed to mark chapter as completed");
            setLoading(false)
        }
    };

    const markChapterIncomplete = async () => {
        setLoading(true)
        const completedChap = completedChapters.filter(item => item !== selectedChapterIndex);
        try {
            const result = await axios.put('/api/enroll-course', {
                courseId: courseId,
                completedChapter: completedChap,
            });
            console.log("UPDATED:", result.data);
            refreshData();
            toast.success("Chapter Marked InCompleted");
            setLoading(false)
        } catch (error) {
            console.error("Error marking chapter as incomplete:", error);
            toast.error("Failed to mark chapter as incomplete");
            setLoading(false)
        }
    };

    const isChapterCompleted = completedChapters.includes(selectedChapterIndex);
    console.log("🎯 DEBUG - isChapterCompleted:", isChapterCompleted);
    console.log("🎯 DEBUG - Button should render:", selectedChapterIndex < courseContent?.length);
    console.log("🎯 DEBUG - courseContent length:", courseContent?.length);
    console.log("🎯 DEBUG - Current chapter data:", courseContent?.[selectedChapterIndex]);

    return (
        <div className='p-10 mt-20'>
            <div key={`chapter-${selectedChapterIndex}-${renderKey}`} className='flex justify-between items-center w-full'>
                <h2 className='font-bold text-3xl gradient-title'>
                    {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName || 'Loading...'}
                </h2>

                <div className="min-w-[200px]">
                    {(() => {
                        console.log("🔍 BUTTON RENDER DEBUG - Evaluating for index:", selectedChapterIndex);
                        console.log("🔍 BUTTON RENDER DEBUG - courseContent exists:", !!courseContent);
                        console.log("🔍 BUTTON RENDER DEBUG - selectedChapterIndex valid:", typeof selectedChapterIndex === 'number' && selectedChapterIndex >= 0 && selectedChapterIndex < courseContent.length);
                        console.log("🔍 BUTTON RENDER DEBUG - isChapterCompleted:", isChapterCompleted);

                        if (courseContent && typeof selectedChapterIndex === 'number' && selectedChapterIndex >= 0 && selectedChapterIndex < courseContent.length) {
                            console.log("🔍 BUTTON RENDER DEBUG - Rendering button for index:", selectedChapterIndex);
                            return isChapterCompleted ? (
                                <Button
                                    disabled={loading}
                                    onClick={markChapterIncomplete} variant="outline" className="bg-white text-black border border-gray-300">
                                    {loading ? <Loader2 className='animate-spin' /> : <X />}Mark Incomplete
                                </Button>
                            ) : (
                                <Button
                                    disabled={loading}
                                    onClick={markChapterCompleted} variant="sex2" className="bg-blue-500 text-white">
                                    {loading ? <Loader2 className='animate-spin' /> : <CheckCircle />} Mark As Completed
                                </Button>
                            );
                        }
                        console.log("🔍 BUTTON RENDER DEBUG - Rendering fallback for index:", selectedChapterIndex);
                        return <div className="text-red-500">No button rendered: Invalid chapter index or data</div>;
                    })()}
                </div>
            </div>

            <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {videoData?.map((video, index) => index < 4 && (
                    <FeatureMotionWrapper index={index} key={index}>
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <YouTube
                                videoId={video?.videoId}
                                opts={{
                                    height: '250',
                                    width: '400',
                                }}
                            />
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>

            <div className='mt-7'>
                {Array.isArray(topics) && topics.length > 0 ? (
                    topics.map((topic, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div className='mt-10 p-5 bg-indigo-100 rounded-lg'>
                                <h2 className='font-bold text-2xl gradient-title'>
                                    {index + 1}. {topic?.topic}
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: topic?.content }}
                                    style={{ lineHeight: '2.5' }}
                                />
                            </div>
                        </FeatureMotionWrapper>
                    ))
                ) : (
                    <p className="text-white italic mt-4">No topics available for this chapter.</p>
                )}
            </div>
        </div>
    );
}

export default ChapterContent;


//DOESNT MAKR AS COMPLETTED
// import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
// import { Button } from '@/components/ui/button'
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'
// import axios from 'axios'
// import { CheckCircle, Cross, X } from 'lucide-react'
// import { useParams } from 'next/navigation'
// import React, { useContext } from 'react'
// import YouTube from 'react-youtube'
// import { toast } from 'sonner'

// function ChapterContent({ courseInfo, refreshData }) {

//     const { courseId } = useParams()

//     const { courses, enrollCourse } = courseInfo || {}
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo

//     const topics = courseContent?.[selectedChapterIndex]?.courseData?.chapters

//     // Get completed chapters from the current enrollment data
//     const completedChapters = enrollCourse?.completedChapter ?? [];

//     const markChapterCompleted = async () => {
//         // Create new array with current chapter if not already included
//         const updatedCompletedChapters = completedChapters.includes(selectedChapterIndex)
//             ? completedChapters
//             : [...completedChapters, selectedChapterIndex];

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters
//             });

//             console.log("UPDATED:", result.data);
//             refreshData(); // This should update courseInfo with fresh data
//             toast.success("Chapter Marked As Completed");
//         } catch (error) {
//             console.error("Error marking chapter as completed:", error);
//             toast.error("Failed to mark chapter as completed");
//         }
//     };

//     const markChapterIncomplete = async () => {
//         // Remove current chapter from completed chapters
//         const updatedCompletedChapters = completedChapters.filter(
//             chapterIndex => chapterIndex !== selectedChapterIndex
//         );

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters
//             });

//             console.log("UPDATED:", result.data);
//             refreshData(); // This should update courseInfo with fresh data
//             toast.success("Chapter Marked As Incomplete");
//         } catch (error) {
//             console.error("Error marking chapter as incomplete:", error);
//             toast.error("Failed to mark chapter as incomplete");
//         }
//     };

//     // Check if current chapter is completed
//     const isChapterCompleted = completedChapters.includes(selectedChapterIndex);

//     return (
//         <div className='p-10 mt-20'>
//             <div className='flex justify-between items-center'>
//                 <h2 className='font-bold text-3xl gradient-title'>
//                     {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
//                 </h2>

//                 {!isChapterCompleted ? (
//                     <Button
//                         onClick={markChapterCompleted}
//                         variant="sex2"
//                     >
//                         <CheckCircle />Mark As Completed
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={markChapterIncomplete}
//                         variant="outline"
//                     >
//                         <X /> Mark Incomplete
//                     </Button>
//                 )}
//             </div>

//             <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                 {
//                     videoData?.map((video, index) => index < 4 && (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className="rounded-lg overflow-hidden shadow-md">
//                                 <YouTube
//                                     videoId={video?.videoId}
//                                     opts={{
//                                         height: '250',
//                                         width: '400',
//                                     }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 }
//             </div>

//             <div className='mt-7'>
//                 {Array.isArray(topics) && topics.length > 0 ? (
//                     topics.map((topic, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='mt-10 p-5 bg-indigo-100 rounded-lg'>
//                                 <h2 className='font-bold text-2xl gradient-title'>
//                                     {index + 1}. {topic?.topic}
//                                 </h2>
//                                 <div
//                                     dangerouslySetInnerHTML={{ __html: topic?.content }}
//                                     style={{ lineHeight: '2.5' }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 ) : (
//                     <p className="text-white italic mt-4">No topics available for this chapter.</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ChapterContent

// DOES MARK AS COMPLETED BUT DOESNT SHOW THE 4TH CHAPTERS BUTTON TO MARK
// import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
// import { Button } from '@/components/ui/button'
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'
// import axios from 'axios'
// import { CheckCircle, Cross, X } from 'lucide-react'
// import { useParams } from 'next/navigation'
// import React, { useContext, useEffect } from 'react'
// import YouTube from 'react-youtube'
// import { toast } from 'sonner'

// function ChapterContent({ courseInfo, refreshData }) {

//     const { courseId } = useParams()

//     const { courses, enrollCourse } = courseInfo || {}
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo

//     const topics = courseContent?.[selectedChapterIndex]?.courseData?.chapters

//     // DEBUG: Log the enrollment data to see what properties exist
//     console.log("🔍 DEBUG - enrollCourse:", enrollCourse);
//     console.log("🔍 DEBUG - selectedChapterIndex:", selectedChapterIndex);
//     console.log("🔍 DEBUG - selectedChapterIndex type:", typeof selectedChapterIndex);

//     // Add useEffect to track when selectedChapterIndex changes
//     useEffect(() => {
//         console.log("🔄 EFFECT - selectedChapterIndex changed to:", selectedChapterIndex);
//     }, [selectedChapterIndex]);

//     // Get completed chapters from the current enrollment data
//     // Try both property names since there's a mismatch between frontend/backend
//     const completedChapters = enrollCourse?.completedChapters ?? enrollCourse?.completedChapter ?? [];

//     console.log("🔍 DEBUG - completedChapters:", completedChapters);
//     console.log("🔍 DEBUG - completedChapters type:", typeof completedChapters);

//     const markChapterCompleted = async () => {
//         // Create new array with current chapter if not already included
//         const updatedCompletedChapters = completedChapters.includes(selectedChapterIndex)
//             ? completedChapters
//             : [...completedChapters, selectedChapterIndex];

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters
//             });

//             console.log("UPDATED:", result.data);
//             refreshData(); // This should update courseInfo with fresh data
//             toast.success("Chapter Marked As Completed");
//         } catch (error) {
//             console.error("Error marking chapter as completed:", error);
//             toast.error("Failed to mark chapter as completed");
//         }
//     };

//     const markChapterIncomplete = async () => {
//         // Remove current chapter from completed chapters
//         const updatedCompletedChapters = completedChapters.filter(
//             chapterIndex => chapterIndex !== selectedChapterIndex
//         );

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters
//             });

//             console.log("UPDATED:", result.data);
//             refreshData(); // This should update courseInfo with fresh data
//             toast.success("Chapter Marked As Incomplete");
//         } catch (error) {
//             console.error("Error marking chapter as incomplete:", error);
//             toast.error("Failed to mark chapter as incomplete");
//         }
//     };

//     // Check if current chapter is completed
//     const isChapterCompleted = completedChapters.includes(selectedChapterIndex);

//     console.log("🎯 DEBUG - isChapterCompleted:", isChapterCompleted);
//     console.log("🎯 DEBUG - Button should render:", selectedChapterIndex < courseContent?.length);
//     console.log("🎯 DEBUG - courseContent length:", courseContent?.length);
//     console.log("🎯 DEBUG - Current chapter data:", courseContent?.[selectedChapterIndex]);

//     return (
//         <div className='p-10 mt-20'>
//             <div className='flex justify-between items-center'>
//                 <h2 className='font-bold text-3xl gradient-title'>
//                     {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
//                 </h2>

//                 {!isChapterCompleted ? (
//                     <Button
//                         onClick={markChapterCompleted}
//                         variant="sex2"
//                     >
//                         <CheckCircle />Mark As Completed
//                     </Button>
//                 ) : (
//                     <Button
//                         onClick={markChapterIncomplete}
//                         variant="outline"
//                     >
//                         <X /> Mark Incomplete
//                     </Button>
//                 )}
//             </div>

//             <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                 {
//                     videoData?.map((video, index) => index < 4 && (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className="rounded-lg overflow-hidden shadow-md">
//                                 <YouTube
//                                     videoId={video?.videoId}
//                                     opts={{
//                                         height: '250',
//                                         width: '400',
//                                     }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 }
//             </div>

//             <div className='mt-7'>
//                 {Array.isArray(topics) && topics.length > 0 ? (
//                     topics.map((topic, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='mt-10 p-5 bg-indigo-100 rounded-lg'>
//                                 <h2 className='font-bold text-2xl gradient-title'>
//                                     {index + 1}. {topic?.topic}
//                                 </h2>
//                                 <div
//                                     dangerouslySetInnerHTML={{ __html: topic?.content }}
//                                     style={{ lineHeight: '2.5' }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 ) : (
//                     <p className="text-white italic mt-4">No topics available for this chapter.</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ChapterContent



// THIS VERSION WORKS BUT CONTINUE WITH THE TUTORIAL
// import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap';
// import { Button } from '@/components/ui/button';
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
// import axios from 'axios';
// import { CheckCircle, X } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import React, { useContext, useEffect } from 'react';
// import YouTube from 'react-youtube';
// import { toast } from 'sonner';

// function ChapterContent({ courseInfo, refreshData }) {
//     const { courseId } = useParams();
//     const { courses, enrollCourse } = courseInfo || {};
//     const courseContent = courseInfo?.courses?.courseContent;
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
//     const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
//     const topics = courseContent?.[selectedChapterIndex]?.courseData?.chapters;

//     // Log for debugging
//     console.log("🔍 DEBUG - enrollCourse:", enrollCourse);
//     console.log("🔍 DEBUG - selectedChapterIndex:", selectedChapterIndex);
//     console.log("🔍 DEBUG - selectedChapterIndex type:", typeof selectedChapterIndex);
//     console.log("🔍 DEBUG - courseContent:", courseContent);

//     // Track changes to selectedChapterIndex and courseContent
//     useEffect(() => {
//         console.log("🔄 EFFECT - Rendering ChapterContent with selectedChapterIndex:", selectedChapterIndex);
//         console.log("🔄 EFFECT - courseContent:", courseContent);
//     }, [selectedChapterIndex, courseContent]);

//     // Loading state
//     if (!courseContent || courseContent.length === 0) {
//         return <div>Loading course content...</div>;
//     }

//     // Get completed chapters
//     const completedChapters = enrollCourse?.completedChapters ?? enrollCourse?.completedChapter ?? [];
//     console.log("🔍 DEBUG - completedChapters:", completedChapters);
//     console.log("🔍 DEBUG - completedChapters type:", typeof completedChapters);

//     const markChapterCompleted = async () => {
//         const updatedCompletedChapters = completedChapters.includes(selectedChapterIndex)
//             ? completedChapters
//             : [...completedChapters, selectedChapterIndex];

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters,
//             });
//             console.log("UPDATED:", result.data);
//             refreshData();
//             toast.success("Chapter Marked As Completed");
//         } catch (error) {
//             console.error("Error marking chapter as completed:", error);
//             toast.error("Failed to mark chapter as completed");
//         }
//     };

//     const markChapterIncomplete = async () => {
//         const updatedCompletedChapters = completedChapters.filter(
//             chapterIndex => chapterIndex !== selectedChapterIndex
//         );

//         try {
//             const result = await axios.put('/api/enroll-course', {
//                 courseId: courseId,
//                 completedChapter: updatedCompletedChapters,
//             });
//             console.log("UPDATED:", result.data);
//             refreshData();
//             toast.success("Chapter Marked As Incomplete");
//         } catch (error) {
//             console.error("Error marking chapter as incomplete:", error);
//             toast.error("Failed to mark chapter as incomplete");
//         }
//     };

//     const isChapterCompleted = completedChapters.includes(selectedChapterIndex);
//     console.log("🎯 DEBUG - isChapterCompleted:", isChapterCompleted);
//     console.log("🎯 DEBUG - Button should render:", selectedChapterIndex < courseContent?.length);
//     console.log("🎯 DEBUG - courseContent length:", courseContent?.length);
//     console.log("🎯 DEBUG - Current chapter data:", courseContent?.[selectedChapterIndex]);

//     return (
//         <div className='p-10 mt-20'>
//             <div className='flex justify-between items-center'>
//                 <h2 className='font-bold text-3xl gradient-title'>
//                     {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName || 'Loading...'}
//                 </h2>

//                 {courseContent && typeof selectedChapterIndex === 'number' && selectedChapterIndex >= 0 && selectedChapterIndex < courseContent.length ? (
//                     isChapterCompleted ? (
//                         <Button onClick={markChapterIncomplete} variant="outline">
//                             <X /> Mark Incomplete
//                         </Button>
//                     ) : (
//                         <Button onClick={markChapterCompleted} variant="sex2">
//                             <CheckCircle /> Mark As Completed
//                         </Button>
//                     )
//                 ) : (
//                     <div className="text-red-500">No button rendered: Invalid chapter index or data</div>
//                 )}
//             </div>

//             <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                 {videoData?.map((video, index) => index < 4 && (
//                     <FeatureMotionWrapper index={index} key={index}>
//                         <div className="rounded-lg overflow-hidden shadow-md">
//                             <YouTube
//                                 videoId={video?.videoId}
//                                 opts={{
//                                     height: '250',
//                                     width: '400',
//                                 }}
//                             />
//                         </div>
//                     </FeatureMotionWrapper>
//                 ))}
//             </div>

//             <div className='mt-7'>
//                 {Array.isArray(topics) && topics.length > 0 ? (
//                     topics.map((topic, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='mt-10 p-5 bg-indigo-100 rounded-lg'>
//                                 <h2 className='font-bold text-2xl gradient-title'>
//                                     {index + 1}. {topic?.topic}
//                                 </h2>
//                                 <div
//                                     dangerouslySetInnerHTML={{ __html: topic?.content }}
//                                     style={{ lineHeight: '2.5' }}
//                                 />
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))
//                 ) : (
//                     <p className="text-white italic mt-4">No topics available for this chapter.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ChapterContent;



