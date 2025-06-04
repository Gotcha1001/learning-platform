import { Gift } from 'lucide-react';
import React from 'react'

function ChapterTopicList({ course }) {
    // Extract the course structure from the nested JSON data
    // This contains all chapters, topics, and metadata for the course
    const courseLayout = course?.courseJson?.course;

    return (
        <div>
            {/* MAIN TITLE SECTION */}
            <h2 className='font-bold text-3xl mt-10 text-center'>Chapters & Topics</h2>

            {/* MAIN CONTAINER - This creates the centered timeline layout */}
            <div className='flex flex-col items-center justify-center mt-10 max-w-4xl mx-auto relative'>

                {/* CONTINUOUS VERTICAL TIMELINE LINE */}
                {/* This is the backbone of the entire design - a single line that runs through all chapters */}
                {/* Positioned absolutely to stay in the center while content flows around it */}
                <div className='absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-gray-300 top-0 bottom-0'></div>

                {/* CHAPTER ITERATION - Loop through each chapter in the course */}
                {courseLayout?.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className='w-full relative'>

                        {/* CHAPTER HEADER SECTION */}
                        {/* Each chapter gets a prominent header card that sits ON TOP of the timeline */}
                        <div className='flex justify-center mb-6'>
                            {/* Chapter Card - Styled as a primary-colored badge */}
                            {/* z-10 ensures it sits above the background timeline line */}
                            <div className='p-6 border shadow-lg rounded-xl bg-primary z-10 text-white max-w-md w-full relative'>
                                {/* Chapter number (e.g., "Chapter 1") */}
                                <h2 className='text-center text-sm font-medium'>Chapter {chapterIndex + 1}</h2>

                                {/* Chapter title/name */}
                                <h2 className='font-bold text-lg text-center mt-2'>{chapter.chapterName}</h2>

                                {/* Chapter metadata - Duration and topic count */}
                                <div className='text-xs mt-3 flex justify-between'>
                                    <span>Duration: {chapter?.duration}</span>
                                    <span>Topics: {chapter?.topics?.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* TOPICS SECTION - This is where the magic happens! */}
                        <div className='relative'>
                            {/* TOPIC ITERATION - Loop through each topic in the current chapter */}
                            {chapter?.topics?.map((topic, topicIndex) => (
                                <div key={topicIndex} className='relative mb-8'>

                                    {/* DESKTOP LAYOUT - Hidden on mobile (sm:hidden shows it on small screens and up) */}
                                    <div className='hidden sm:block'>
                                        {/* NUMBERED CIRCLE - The key visual element! */}
                                        {/* Positioned exactly on the center timeline using absolute positioning */}
                                        {/* transform -translate-x-1/2 centers it perfectly on the line */}
                                        <div className='absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-4 border-white shadow-md z-20'>
                                            {topicIndex + 1}
                                        </div>

                                        {/* ALTERNATING TOPIC CARDS - This creates the zigzag pattern! */}
                                        <div className='flex items-center'>
                                            {/* LEFT SIDE TOPICS (even indices: 0, 2, 4, 6...) */}
                                            {/* These appear on the LEFT side of the timeline */}
                                            {topicIndex % 2 === 0 && (
                                                <div className='bg-white border shadow-md rounded-lg p-4 mr-8 max-w-xs relative z-10 ml-auto'>
                                                    {/* text-right aligns content to point toward the center line */}
                                                    <p className='text-sm font-medium text-right'>{topic}</p>
                                                </div>
                                            )}

                                            {/* RIGHT SIDE TOPICS (odd indices: 1, 3, 5, 7...) */}
                                            {/* These appear on the RIGHT side of the timeline */}
                                            {topicIndex % 2 !== 0 && (
                                                <div className='bg-white border shadow-md rounded-lg p-4 ml-8 max-w-xs relative z-10 mr-auto'>
                                                    {/* text-left aligns content away from the center line */}
                                                    <p className='text-sm font-medium text-left'>{topic}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* MOBILE LAYOUT - Only visible on mobile devices */}
                                    {/* sm:hidden means "hide on small screens and up" (so only show on xs) */}
                                    <div className='sm:hidden flex flex-col items-center px-4'>
                                        {/* Mobile numbered circle - positioned at top instead of center */}
                                        <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-4 border-white shadow-md z-20 mb-3'>
                                            {topicIndex + 1}
                                        </div>

                                        {/* Mobile topic card - full width, centered text */}
                                        {/* No alternating sides on mobile - everything is centered */}
                                        <div className='bg-white border shadow-md rounded-lg p-4 max-w-xs w-full relative z-10'>
                                            <p className='text-sm font-medium text-center'>{topic}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* CHAPTER COMPLETION REWARD */}
                            {/* After all topics in a chapter, show a completion celebration */}
                            <div className='flex flex-col items-center mt-8 mb-8 relative z-20'>
                                {/* Gift icon in a green circle - represents achievement */}
                                <div className='bg-green-500 rounded-full p-3 shadow-lg border-4 border-white'>
                                    <Gift className='text-white w-6 h-6' />
                                </div>

                                {/* Congratulatory message */}
                                <p className='text-center text-sm mt-2 text-gray-200 gradient-background2 max-w-xs px-4 py-4 rounded relative z-10'>
                                    Congratulations! You have completed this chapter.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* FINAL COURSE COMPLETION CELEBRATION */}
                {/* After ALL chapters are done, show the ultimate achievement */}
                <div className='p-6 border shadow-lg rounded-xl bg-green-600 text-white text-center font-bold text-lg mt-8 relative z-10'>
                    🎉 Course Complete! 🎉
                </div>
            </div>
        </div>
    )
}

export default ChapterTopicList




/*
DESIGN WORKFLOW EXPLANATION:
==========================

1. STRUCTURE HIERARCHY:
   - Course Title
   - Continuous Timeline Line (vertical)
   - Chapter 1 Header
     - Topic 1 (Left)
     - Topic 2 (Right) 
     - Topic 3 (Left)
     - Topic 4 (Right)
     - Chapter 1 Completion Badge
   - Chapter 2 Header
     - Topic 1 (Left)
     - Topic 2 (Right)
     - etc...
   - Final Course Completion

2. VISUAL DESIGN PRINCIPLES:
   - Central timeline creates visual flow and progress
   - Alternating left/right creates engaging zigzag pattern
   - Numbered circles show clear progression
   - Color coding: Blue (topics), Green (completion), Primary (chapters)
   - Shadows and borders create depth and separation

3. RESPONSIVE DESIGN:
   - Desktop: Alternating left/right zigzag layout
   - Mobile: Vertical stack, all centered for easy reading

4. Z-INDEX LAYERING:
   - Timeline line: bottom layer (z-index: default)
   - Topic cards: middle layer (z-10)
   - Numbered circles: top layer (z-20)
   - This ensures proper visual stacking

5. SPACING & FLOW:
   - Consistent mb-8 between topics
   - Extra spacing around chapter headers
   - Completion badges get special spacing to stand out

6. USER EXPERIENCE:
   - Clear visual progress through course
   - Immediate feedback on completion
   - Easy to scan and understand structure
   - Mobile-friendly for on-the-go learning
*/