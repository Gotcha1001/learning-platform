import React from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

function MyCourses() {
    return (
        <div>
            <WelcomeBanner />
            <h2 className='text-3xl font-bold gradient-title mt-4'>My Learning</h2>
            <EnrollCourseList />
        </div>
    )
}

export default MyCourses