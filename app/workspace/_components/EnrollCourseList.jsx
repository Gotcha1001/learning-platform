"use client"
import FeatureMotionWrapper from '@/app/components/FramerMotion/FeatureMotionWrapperMap'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'

function EnrollCourseList() {
    const [enrolledCourseList, setEnrolledList] = useState([])

    useEffect(() => {
        GetEnrolledCourse()
    }, [])

    const GetEnrolledCourse = async () => {
        const result = await axios.get('/api/enroll-course')
        console.log("ENROLL DATA:", result.data)
        setEnrolledList(result.data)
    }

    return enrolledCourseList?.length > 0 && (
        <div className='mt-3'>
            <h2 className='font-bold text-2xl gradient-title'>Continue Learning Your Courses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {enrolledCourseList?.map((course, index) => (
                    <FeatureMotionWrapper index={index} key={index}>
                        <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} />
                    </FeatureMotionWrapper>
                ))}
            </div>

        </div>
    )
}

export default EnrollCourseList