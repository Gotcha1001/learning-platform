import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import { Book, Loader2Icon, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function EnrollCourseCard({ course, enrollCourse }) {

    const CalculatePerProgress = () => {
        return (enrollCourse?.completedChapters?.length ?? 0 / course?.courseContent?.length) * 100
    }

    const courseJson = course?.courseJson?.course;
    return (
        <div className='shadow-lg rounded-xl hover:scale-105 transition-all'>
            <Image src={course?.bannerImageUrl} alt='Image' height={300} width={400}
                className='rounded-t-lg w-full aspect-video object-cover '
            />
            <div className='p-3 flex flex-col gap-3'>
                <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
                <div className=''>
                    <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculatePerProgress()}%</span></h2>
                    <Progress value={CalculatePerProgress()} />
                    <Link href={'/workspace/view-course/' + course?.cid}>
                        <Button className={'w-full mt-3'}><PlayCircle /> Continue Learning </Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard