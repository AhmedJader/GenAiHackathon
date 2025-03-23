"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    {
      name: "Advanced Functions",
      icon: "📐",
      description: "Explore advanced mathematical concepts and functions",
      color: "from-blue-500 to-purple-500",
      image: "/advanced.png",
    },
    {
      name: "Calculus",
      icon: "📈",
      description: "Master derivatives, integrals, and limits",
      color: "from-green-500 to-teal-500",
      image: "/advanced.png",
    },
    {
      name: "English",
      icon: "📚",
      description: "Enhance your language and literature skills",
      color: "from-yellow-500 to-orange-500",
      image: "/advanced.png",
    },
    {
      name: "Chemistry",
      icon: "⚗️",
      description: "Discover the science of matter and reactions",
      color: "from-red-500 to-pink-500",
      image: "/advanced.png",
    },
    {
      name: "Physics",
      icon: "🔭",
      description: "Study the fundamental laws of the universe",
      color: "from-purple-500 to-indigo-500",
      image: "/advanced.png",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))]"></div>
          <div className="">
            <h1 className="text-7xl mt-25 font-bold tracking-tight animate-fade-down text-center">
              Available Subjects
              <p className="text-4xl mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Choose Your Path
              </p>
            </h1>
          </div>
        </div>

      {/* Subject Cards */}
      <div className="container mx-auto py-16 animate-fade-down">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name)}
              className={`bg-white/95 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedSubject === subject.name ? "ring-4 ring-blue-400" : ""
              }`}
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3
                className={`text-2xl font-bold mb-2 bg-gradient-to-r ${subject.color} text-transparent bg-clip-text`}
              >
                {subject.name}
              </h3>
              <p className="text-gray-600 mb-6">{subject.description}</p>
              {selectedSubject === subject.name && (
                <Link
                  href={
                    subject.name === "Advanced Functions"
                      ? "/quiz/advancedfunctions"
                      : `/quiz/questions?subject=${encodeURIComponent(
                          subject.name
                        )}`
                  }
                >
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl">
                    Start Quiz →
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
