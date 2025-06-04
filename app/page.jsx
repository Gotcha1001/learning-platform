// "use client";

// import { Button } from "@/components/ui/button";
// import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";
// import TriangleMandalas2 from "./components/Mandalas/TriandleMandalas2";
// import TriangleMandalas3 from "./components/Mandalas/TriangleMandalas3";
// import MinimalSmoke from "./components/SmokeEffects/MinimalSmoke";
// import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-500 to-black flex flex-col items-center justify-center p-4">
//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, x: 100 },
//           visible: { opacity: 1, x: 0 },
//         }}
//       >
//         <UserButton />
//         <TriangleMandalas3 />
//         <MinimalSmoke visible={true} />
//         <h1 className="text-5xl font-bold text-white mb-6 text-center">
//           AI-Powered Learning Platform
//         </h1>
//         <p className="text-white text-lg max-w-xl text-center">
//           Create, manage, and transform your course content into automated YouTube videos using advanced AI tools.
//         </p>
//       </MotionWrapperDelay>

//       <div className="mb-6 mt-6">
//         <MotionWrapperDelay
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           variants={{
//             hidden: { opacity: 0, y: -100 },
//             visible: { opacity: 1, y: 0 },
//           }}
//         >
//           <img
//             src="morning.jpg"
//             alt="AI Course Generator"
//             className="w-64 h-64 rounded-full border-4 border-white shadow-lg object-cover"
//           />
//         </MotionWrapperDelay>
//       </div>

//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, x: 100 },
//           visible: { opacity: 1, x: 0 },
//         }}
//       >
//         <Link href="/workspace">
//           <Button variant="default" className="mt-4 p-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
//             Launch Course Workspace
//           </Button>
//         </Link>
//       </MotionWrapperDelay>
//     </div>
//   );
// }






"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";
import TriangleMandalas2 from "./components/Mandalas/TriandleMandalas2";
import TriangleMandalas3 from "./components/Mandalas/TriangleMandalas3";
import MinimalSmoke from "./components/SmokeEffects/MinimalSmoke";
import { UserButton } from "@clerk/nextjs";
import Autoplay from "embla-carousel-autoplay";

// Enhanced carousel slides showcasing the learning platform
const carouselSlides = [
  { src: "/morning.jpg", alt: "AI Course Creation Dashboard" },
  { src: "/morning.jpg", alt: "YouTube Video Integration" },
  { src: "/morning.jpg", alt: "Smart Learning Materials" },
  { src: "/morning.jpg", alt: "Progress Tracking System" },
  { src: "/morning.jpg", alt: "AI-Generated Content" },
  { src: "/morning.jpg", alt: "Interactive Course Builder" },
  { src: "/morning.jpg", alt: "Automated Video Production" },
  { src: "/morning.jpg", alt: "Personalized Learning Path" },
];

// Floating particles animation data
const floatingParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  animationDelay: Math.random() * 5,
  animationDuration: Math.random() * 10 + 15,
}));

function CarouselFallback() {
  return (
    <div className="w-full max-w-[700px] mx-auto h-[450px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gradient-to-r from-purple-400 to-indigo-400 mr-4"></div>
      <p className="text-gray-200 text-xl font-medium">
        Preparing your learning experience...
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-900 via-indigo-500 to-black relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          >
            🎓
          </div>
        ))}
      </div>

      <TriangleMandalas3 />
      <MinimalSmoke visible={true} />

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-800 text-white py-8 shadow-2xl relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide">
              🎓 AI Learning Academy
            </h1>
            <UserButton />
          </div>
          <p className="text-center text-lg sm:text-xl text-purple-200 font-light">
            Smart Course Creation • YouTube Integration • AI-Generated Content
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <section className="container mx-auto px-4 py-16 text-center">
          {/* Hero Title with Enhanced Description */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-title mb-8 leading-tight text-white">
              Transform Learning with AI
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-purple-300">
                Create, Manage & Track Your Educational Journey
              </span>
            </h2>
          </MotionWrapperDelay>

          {/* Revolutionary Features Banner */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 Next-Generation Learning Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">🎬</div>
                  <p className="text-purple-200 font-semibold">
                    YouTube Integration
                  </p>
                  <p className="text-sm text-gray-300">
                    Automated video creation & management
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🧠</div>
                  <p className="text-purple-200 font-semibold">
                    AI Content Generation
                  </p>
                  <p className="text-sm text-gray-300">
                    Smart learning materials & assessments
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📊</div>
                  <p className="text-purple-200 font-semibold">
                    Progress Tracking
                  </p>
                  <p className="text-sm text-gray-300">
                    Real-time learning analytics & insights
                  </p>
                </div>
              </div>
            </div>
          </MotionWrapperDelay>

          {/* Enhanced Carousel */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Suspense fallback={<CarouselFallback />}>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full max-w-[700px] mx-auto mb-12"
              >
                <CarouselContent>
                  {carouselSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          width={700}
                          height={450}
                          className="rounded-2xl shadow-2xl border-4 border-gradient-to-r from-purple-400 to-indigo-400 object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold text-lg drop-shadow-lg">
                            {slide.alt}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-purple-600/80 hover:bg-purple-500 border-purple-400" />
                <CarouselNext className="bg-purple-600/80 hover:bg-purple-500 border-purple-400" />
              </Carousel>
            </Suspense>
          </MotionWrapperDelay>

          {/* Enhanced Description */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                Welcome to the future of education where artificial intelligence meets
                personalized learning. Our platform revolutionizes course creation by
                <span className="text-purple-300 font-semibold">
                  {" "}seamlessly integrating YouTube video production
                </span>
                {" "}with AI-generated learning materials, creating an immersive
                educational experience tailored to your unique learning style.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From automated content creation to intelligent progress tracking,
                we empower educators and learners alike to achieve more than ever before.
                Transform your knowledge into engaging courses and watch your educational
                impact grow exponentially.
              </p>
            </div>
          </MotionWrapperDelay>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {/* Feature 1 */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-md border border-purple-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  YouTube Automation
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Create professional educational videos automatically. Upload,
                  edit, and publish to YouTube with intelligent scheduling and
                  optimization features.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 2 */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 backdrop-blur-md border border-indigo-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  AI Content Generator
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Generate comprehensive learning materials, quizzes, and
                  assessments using advanced AI. Customize content to match
                  your teaching style and student needs.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 3 */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Smart Analytics
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Track student progress with detailed analytics. Monitor
                  engagement, completion rates, and learning outcomes with
                  real-time insights and recommendations.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 4 */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              variants={{
                hidden: { opacity: 0, y: -60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 backdrop-blur-md border border-cyan-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Course Management
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Organize and manage multiple courses effortlessly. Built-in
                  tools for student enrollment, progress tracking, and
                  automated notifications.
                </p>
              </div>
            </MotionWrapperDelay>
          </div>

          {/* Enhanced CTA Section */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border border-purple-400/40 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Teaching?
              </h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Join thousands of educators who've revolutionized their teaching
                with our AI-powered platform. Start creating engaging courses today.
              </p>

              <Link href="/workspace">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 hover:from-indigo-600 hover:via-purple-700 hover:to-blue-700 transition-all duration-400 text-white font-bold px-12 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 text-lg">
                  Launch Course Workspace
                </Button>
              </Link>

              <div className="flex justify-center items-center mt-6 space-x-8 text-sm text-purple-200">
                <span>🎬 Video Automation</span>
                <span>🧠 AI-Generated Content</span>
                <span>📊 Progress Tracking</span>
              </div>
            </div>
          </MotionWrapperDelay>

          {/* Success Stories/Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "Transformed my online teaching completely!"
              </p>
              <p className="text-xs text-purple-400 mt-1">- Prof. Amanda Chen</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "Students are more engaged than ever."
              </p>
              <p className="text-xs text-purple-400 mt-1">- Dr. Marcus Rivera</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "The future of education is here."
              </p>
              <p className="text-xs text-purple-400 mt-1">- Sarah Williams</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 italic">
            AI-Powered Learning • YouTube Integration • Smart Analytics • Course Management
          </p>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-purple-900/50 text-gray-200 py-6 mt-auto border-t border-purple-500/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-2">
            © 2025 AI Learning Academy - Empowering Education Through Technology
          </p>
          <p className="text-xs text-purple-300">
            🎓 Revolutionizing Learning • Creating Tomorrow's Education Today 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}