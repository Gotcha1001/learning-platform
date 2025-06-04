"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AddNewCourseDialog from '../_components/AddNewCourseDialog'
import CourseCard from '../_components/CourseCard'
import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
import { Skeleton } from '@/components/ui/skeleton'

function Explore() {


    const [courseList, setCourseList] = useState([])

    const { user } = useUser()

    useEffect(() => {
        user && GetCourseList()
    }, [user])

    const GetCourseList = async () => {
        const result = await axios.get('/api/courses?courseId=0')
        console.log("GET COURSE:", result.data)
        setCourseList(result.data)
    }



    return (
        <div>
            <h2 className='font-bold text-3xl gradient-title mb-6'>Explore Other Courses</h2>
            <div className='flex gap-5 max-w-md'>
                <Input placeholder="search" />
                <Button><Search /> Search</Button>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                {courseList.length > 0 ? courseList?.map((course, index) => (
                    <FeatureMotionWrapper index={index} key={index}>
                        <CourseCard course={course} />
                    </FeatureMotionWrapper>
                )) :
                    [0, 1, 2, 3].map((item, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <Skeleton className='w-full h-[240px] bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200' />
                        </FeatureMotionWrapper>
                    ))
                }
            </div>

        </div>
    )
}

export default Explore