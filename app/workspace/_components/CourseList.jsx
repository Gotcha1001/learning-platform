"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
import CourseCard from './CourseCard'

function CourseList() {

    const [courseList, setCourseList] = useState([])

    const { user } = useUser()

    useEffect(() => {
        user && GetCourseList()
    }, [user])

    const GetCourseList = async () => {
        const result = await axios.get('/api/courses')
        console.log("GET COURSE:", result.data)
        setCourseList(result.data)
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl mb-5'>Course List</h2>
            {courseList?.length == 0 ?
                <div className='flex p-7 items-center justify-center flex-col border rounded-lg mt-2 gradient-background2 '>
                    <Image src={'/online-education.png'} alt='Online image' height={200} width={200} />
                    <h2 className='my-2 text-xl text-white'>Looks like you haven't created any courses yet</h2>
                    <AddNewCourseDialog>
                        <Button>+ Create Your First Course</Button>
                    </AddNewCourseDialog>

                </div> :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {courseList?.map((course, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <CourseCard course={course} />
                        </FeatureMotionWrapper>
                    ))}
                </div>
            }
        </div>
    )
}

export default CourseList