



import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader2Icon, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function CourseInfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const GenerateCourseContent = async () => {
        // Call API to generate content
        try {
            setLoading(true);
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log("Generated Content:", result.data);
            setLoading(false);
            router.replace('/workspace')
            toast.success('Course Generated Successfully...')
        } catch (e) {
            console.error("Error generating course content:", e);
            setLoading(false);
            toast.error("Server Side Error, Try Again!")
        }

    }

    return (
        <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow-lg'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-3xl'>
                    {courseLayout?.name}
                </h2>
                <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {courseLayout?.chapters?.map((chapter, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div className="flex items-center gap-5 p-3 rounded-lg shadow-lg">
                                <Clock className="text-blue-600" />
                                <section>
                                    <h2 className='font-bold'>Duration</h2>
                                    <p className="text-sm">Duration: {chapter.duration}</p>
                                </section>
                            </div>
                            <div className="flex items-center gap-5 p-3 rounded-lg shadow-lg">
                                <Book className="text-green-600" />
                                <section>
                                    <h2 className='font-bold'>Chapters</h2>
                                    <h2 className="">{chapter.chapterName}</h2>
                                </section>
                            </div>
                            <div className="flex items-center gap-5 p-3 rounded-lg shadow-lg">
                                <TrendingUp className="text-purple-600" />
                                <section>
                                    <h2 className="font-bold">Difficulty Level</h2>
                                    <h2 className="">{courseLayout?.level}</h2>
                                </section>
                            </div>
                        </FeatureMotionWrapper>
                    ))}
                </div>
                {!viewCourse ? < Button
                    disabled={loading}
                    onClick={GenerateCourseContent}>
                    {loading ? <Loader2Icon className='animate-spin' /> : <span>Generate Content</span>}
                </Button>
                    : <Link href={'/course/' + course?.cid}><Button><PlayCircle />Continue Learning</Button>  </Link>}



            </div>
            {/* Banner image with proper error handling */}
            {
                course?.bannerImageUrl && (
                    <div className="mt-6">
                        <Image
                            src={course.bannerImageUrl}
                            alt={`${courseLayout?.name || 'Course'} banner`}
                            width={400} height={400}
                            className="w-[440px] h-[300px] object-cover rounded-lg mt-5 md:mt-0 aspect-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )
            }
        </div >
    );
}

export default CourseInfo;
