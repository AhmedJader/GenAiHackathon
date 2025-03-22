import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AdvancedFunctions() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image 
          className="object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
          src="/advanced.png" 
          alt="advanced function" 
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm flex justify-between items-center px-40">
          {/* Title */}
          <div className="animate-fade-in">
            <h1 className="text-7xl font-bold text-white tracking-tight">
              Advanced Functions
              <p className="text-4xl mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Grade 12</p>
            </h1>
          </div>

          {/* Quiz Card */}
          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
            <p className="text-red-500 font-semibold flex items-center gap-3 text-lg">
              <span className="animate-pulse">⏳</span> 15 - 30 minutes
            </p>
            <p className="text-xl font-bold mt-3 text-gray-800">✨ Beginner Friendly</p>
            <p className="text-gray-600 mt-2">Perfect for students starting their journey.</p>
            <Link href="/quiz/advancedfunctions/questions" className="block mt-6">
              <Button className="w-full bg-blue-400 hover:bg-blue-300 text-lg py-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Start Quiz →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-40 py-24">
        <div className="flex justify-between items-start gap-20">
          {/* AI Help Card */}
          <div className="bg-blue-400 p-[1px] rounded-2xl shadow-2xl w-96 transform hover:scale-105 transition-all duration-300">
            <div className="bg-white p-8 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl animate-bounce">🤖</span>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-xl">AI Assistant</p>
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-800">Need Help?</p>
              <p className="text-gray-600 mt-2">Get instant help with challenging concepts and problem-solving.</p>
              <Button className="mt-6 w-full bg-blue-400 hover:bg-blue-300 text-lg py-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                💬 Ask AI
              </Button>
            </div>
          </div>

          {/* Course Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-bold text-white mb-8">Course Overview</h2>
            
            <div className="bg-white/95 p-8 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-300">
              <p className="text-xl text-gray-700 leading-relaxed">
                Advanced Functions (Grade 12) is a comprehensive mathematics course that builds upon fundamental algebraic concepts. This course is designed to deepen your understanding of functions and their applications in real-world scenarios.
              </p>
            </div>

            <div className="gap-6">
              <div className="bg-white/95 p-8 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Course Curriculum</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">●</span>
                    Polynomial and Rational Functions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-500">●</span>
                    Exponential and Logarithmic Functions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">●</span>
                    Trigonometric Functions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-500">●</span>
                    Function Transformations
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/quiz/advancedfunctions/questions">
                <Button size="lg" className="w-full bg-green-400 hover:bg-green-300 text-xl py-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Begin Your Learning Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
