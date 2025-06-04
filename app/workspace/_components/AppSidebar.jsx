// "use client"
// import FeatureMotionWrapper from "@/app/components/FramerMotion/FeatureMotionWrapperMap"
// import { Button } from "@/components/ui/button"
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Book, Compass, ImageIcon, LayoutDashboard, PencilRulerIcon, WalletCards } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import AddNewCourseDialog from "./AddNewCourseDialog"

// const SidebarOptions = [
//     {
//         title: 'Dashboard',
//         icon: LayoutDashboard,
//         path: '/workspace'
//     },
//     {
//         title: 'My Learning',
//         icon: Book,
//         path: '/workspace/my-courses'
//     },
//     {
//         title: 'Explore Courses',
//         icon: Compass,
//         path: '/workspace/explore'
//     },
//     {
//         title: 'AI Tools',
//         icon: PencilRulerIcon,
//         path: '/workspace/ai-tools'
//     },
//     {
//         title: 'Billing',
//         icon: WalletCards,
//         path: '/workspace/billing'
//     },
//     {
//         title: 'Profile',
//         icon: ImageIcon,
//         path: '/workspace/profile'
//     },
// ]



// export function AppSidebar() {

//     const path = usePathname()

//     return (
//         <Sidebar className="p-4">
//             <SidebarHeader>
//                 <Image src="/logo.jpg" alt="LOGO" height={300} width={300}
//                     className="rounded-lg h-[50px] w-[300px]"
//                 />
//             </SidebarHeader>
//             <SidebarContent>
//                 <SidebarGroup>
//                     <AddNewCourseDialog>
//                         <Button variant="sex">Create New Course</Button>
//                     </AddNewCourseDialog>

//                 </SidebarGroup>
//                 <SidebarGroup>
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {SidebarOptions.map((item, index) => (
//                                 <FeatureMotionWrapper key={index} index={index}>
//                                     <SidebarMenuItem>
//                                         <SidebarMenuButton asChild className="p-5">
//                                             <Link href={item.path} className={`text-[17px] ${path.includes(item.path) && 'text-purple-900 bg-indigo-500'}`}>
//                                                 <item.icon className="h-7 w-7" />
//                                                 <span>{item.title}</span>
//                                             </Link>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 </FeatureMotionWrapper>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//             <SidebarFooter />
//         </Sidebar>
//     )
// }




"use client"
import FeatureMotionWrapper from "@/app/components/FramerMotion/FeatureMotionWrapperMap"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Compass, ImageIcon, LayoutDashboard, PencilRulerIcon, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AddNewCourseDialog from "./AddNewCourseDialog"

const SidebarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
    },
    {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-courses'
    },
    {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore'
    },
    {
        title: 'AI Tools',
        icon: PencilRulerIcon,
        path: '/workspace/ai-tools'
    },
    {
        title: 'Billing',
        icon: WalletCards,
        path: '/workspace/billing'
    },
    {
        title: 'Profile',
        icon: ImageIcon,
        path: '/workspace/profile'
    },
]

export function AppSidebar() {
    const path = usePathname()

    return (
        <Sidebar className="p-4">
            <SidebarHeader>
                <Image
                    src="/logo.jpg"
                    alt="LOGO"
                    height={300}
                    width={300}
                    className="rounded-lg h-[50px] w-[300px]"
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <AddNewCourseDialog>
                        <Button variant="sex">Create New Course</Button>
                    </AddNewCourseDialog>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarOptions.map((item, index) => {
                                const isActive = path === item.path
                                return (
                                    <FeatureMotionWrapper key={index} index={index}>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild className="p-5">
                                                <Link
                                                    href={item.path}
                                                    className={`text-[17px] ${isActive ? 'text-purple-900 bg-indigo-500' : ''}`}
                                                >
                                                    <item.icon className="h-7 w-7" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </FeatureMotionWrapper>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
