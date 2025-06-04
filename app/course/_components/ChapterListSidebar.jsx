// import React, { useContext } from 'react'
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap';
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

// function ChapterListSidebar({ courseInfo }) {

//     const course = courseInfo?.courses;
//     const enrollCourse = courseInfo?.enrollCourse;
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     let completedChapter = enrollCourse?.completedChapters ?? []



//     return (
//         <div className='w-90 gradient-background2 min-h-screen p-5'>
//             <h2 className='my-3 font-bold text-2xl gradient-title'>Chapters ({courseContent?.length})</h2>
//             <Accordion type="single" collapsible>
//                 {courseContent?.map((chapter, index) => (
//                     <FeatureMotionWrapper index={index} key={index}>
//                         <AccordionItem
//                             onClick={() => setSelectedChapterIndex(index)}
//                             value={chapter?.courseData?.chapterName}

//                         >
//                             <AccordionTrigger

//                                 className={`text-white  ${completedChapter.includes(index) ? 'text-indigo-500' : ''}`}>
//                                 <span className={`text-white rounded-full px-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : ''}`}>{index + 1}.</span>
//                                 {chapter?.courseData?.chapterName}</AccordionTrigger>
//                             <AccordionContent asChild>
//                                 <div className=''>
//                                     {chapter?.courseData?.chapters.map((topic, index_) => (
//                                         <FeatureMotionWrapper index={index_} key={index_}>
//                                             <h2 className={`p-4 rounded-lg my-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : 'bg-white'}`}>{topic?.topic}</h2>
//                                         </FeatureMotionWrapper>

//                                     ))}
//                                 </div>
//                             </AccordionContent>
//                         </AccordionItem>
//                     </FeatureMotionWrapper>
//                 ))}

//             </Accordion>
//         </div>
//     )
// }

// export default ChapterListSidebar





import React, { useContext } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

function ChapterListSidebar({ courseInfo }) {

    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = courseInfo?.courses?.courseContent
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
    let completedChapter = enrollCourse?.completedChapters ?? []

    return (
        <div className='w-150 gradient-background2 min-h-screen p-5'>
            <h2 className='my-3 font-bold text-2xl gradient-title'>Chapters ({courseContent?.length})</h2>
            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem
                        key={index}
                        onClick={() => setSelectedChapterIndex(index)}
                        value={chapter?.courseData?.chapterName}
                    >
                        <AccordionTrigger
                            className={`text-white px-5  ${completedChapter.includes(index) ? 'text-green-400' : ''}`}>
                            <span className={`text-white rounded-full px-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : ''}`}>{index + 1}.</span>
                            {chapter?.courseData?.chapterName}
                        </AccordionTrigger>
                        <AccordionContent asChild>
                            <div className=''>
                                {chapter?.courseData?.chapters.map((topic, index_) => (
                                    <h2 key={index_} className={`p-4 rounded-lg my-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : 'bg-white'}`}>{topic?.topic}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default ChapterListSidebar






// import React, { useContext } from 'react'
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

// function ChapterListSidebar({ courseInfo }) {

//     const course = courseInfo?.courses;
//     const enrollCourse = courseInfo?.enrollCourse;
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     let completedChapter = enrollCourse?.completedChapters ?? []

//     return (
//         <div className='w-90 gradient-background2 min-h-screen p-5'>
//             <h2 className='my-3 font-bold text-2xl gradient-title'>Chapters ({courseContent?.length})</h2>
//             <Accordion type="single" collapsible>
//                 {courseContent?.map((chapter, index) => (
//                     <AccordionItem
//                         key={index}
//                         onClick={() => setSelectedChapterIndex(index)}
//                         value={chapter?.courseData?.chapterName}
//                     >
//                         <AccordionTrigger
//                             className={`text-white  ${completedChapter.includes(index) ? 'text-indigo-500' : ''}`}>
//                             <span className={`text-white rounded-full px-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : ''}`}>{index + 1}.</span>
//                             {chapter?.courseData?.chapterName}
//                         </AccordionTrigger>
//                         <AccordionContent asChild>
//                             <div className=''>
//                                 {chapter?.courseData?.chapters.map((topic, index_) => (
//                                     <h2 key={index_} className={`p-4 rounded-lg my-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : 'bg-white'}`}>{topic?.topic}</h2>
//                                 ))}
//                             </div>
//                         </AccordionContent>
//                     </AccordionItem>
//                 ))}
//             </Accordion>
//         </div>
//     )
// }

// export default ChapterListSidebar




 





// import React, { useContext } from 'react'
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

// function ChapterListSidebar({ courseInfo }) {

//     const course = courseInfo?.courses;
//     const enrollCourse = courseInfo?.enrollCourse;
//     const courseContent = courseInfo?.courses?.courseContent
//     const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
//     let completedChapter = enrollCourse?.completedChapters ?? []

//     return (
//         <div className='w-150 gradient-background2 min-h-screen p-5 flex flex-col overflow-hidden'>
//             <h2 className='my-3 font-bold text-2xl gradient-title'>Chapters ({courseContent?.length})</h2>
//             <div className="flex-1 overflow-hidden">
//                 <Accordion type="single" collapsible className="w-full">
//                     {courseContent?.map((chapter, index) => (
//                         <AccordionItem
//                             key={index}
//                             onClick={() => setSelectedChapterIndex(index)}
//                             value={chapter?.courseData?.chapterName}
//                             className="w-full"
//                         >
//                             <AccordionTrigger
//                                 className={`text-white px-5 w-full ${completedChapter.includes(index) ? 'text-green-400' : ''}`}>
//                                 <span className={`text-white rounded-full px-1 ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : ''}`}>{index + 1}.</span>
//                                 <span className="flex-1 text-left truncate">{chapter?.courseData?.chapterName}</span>
//                             </AccordionTrigger>
//                             <AccordionContent asChild>
//                                 <div className='w-full max-w-full overflow-hidden'>
//                                     {chapter?.courseData?.chapters.map((topic, index_) => (
//                                         <h2 key={index_} className={`p-4 rounded-lg my-1 text-sm break-words overflow-hidden ${completedChapter.includes(index) ? 'bg-gradient-to-b from-green-500 via-blue-500 to-purple-900' : 'bg-white'}`}>
//                                             {topic?.topic}
//                                         </h2>
//                                     ))}
//                                 </div>
//                             </AccordionContent>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </div>
//         </div>
//     )
// }

// export default ChapterListSidebar
