import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Loader2Icon, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseCard({ course }) {

    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false)

    const onEnrollCourse = async () => {
        try {
            setLoading(true)
            const result = await axios.post('/api/enroll-course', {
                courseId: course?.cid
            })
            console.log("ENROLL RESULT:", result.data)
            if (result.data.resp) {
                toast.warning("Already Enrolled...")
                setLoading(false)
                return;
            }
            toast.success("Enrolled...")
            setLoading(false)
        } catch (e) {
            console.error("Enrollment Error:", e.response?.data || e.message)
            toast.error(e.response?.data?.error || "Internal Server Error")
            setLoading(false)
        }

    }

    return (
        <div className='shadow-lg rounded-xl hover:scale-105 transition-all'>
            <Image src={course?.bannerImageUrl} alt='Image' height={300} width={400}
                className='rounded-t-lg w-full aspect-video object-cover '
            />
            <div className='p-3 flex flex-col gap-3'>
                <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
                <div className='flex justify-between items-center'>
                    <h2 className='flex items-center gap-2 text-sm'><Book className='text-primary h-5 w-5' /> {courseJson?.noOfChapters} Chapters</h2>
                    {course?.courseContent?.length
                        ? <Button
                            disabled={loading}
                            onClick={onEnrollCourse}
                            size={'sm'}>
                            {loading ? <Loader2Icon className='animate-spin' /> : <PlayCircle />} Start Learning</Button>
                        :

                        <Link href={'/workspace/edit-course/' + course?.cid}>
                            <Button variant="sex1" size={'sm'}><Settings />Generate Course</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard