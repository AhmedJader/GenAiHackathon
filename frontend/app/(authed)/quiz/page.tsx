"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = ["Calculus", "Advanced Functions", "English", "Chemistry", "Physics"];

  return (
    <main className="flex min-h-screen items-center justify-center relative animate-fade-down">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz</h1>
        <p className="text-lg text-muted-foreground mb-8">Select a subject to get started:</p>
        
        {/* Subject Selection */}
        <div className="flex justify-center space-x-4 mb-8">
          {subjects.map((subject) => (
            <Button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`${
                selectedSubject === subject
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-6 py-2 rounded-lg transition-all duration-400 hover:bg-green-500 hover:scale-105 ease-in-out hover:cursor-pointer`}
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Display Selected Subject */}
        {selectedSubject && (
          <p className="text-green-500 mb-4">Selected Subject: {selectedSubject}</p>
        )}

        {/* Conditional "Get Started" Button */}
        {selectedSubject && (
          <Link href={selectedSubject === "Advanced Functions" ? "/quiz/advancedfunctions" : `/quiz/questions?subject=${encodeURIComponent(selectedSubject)}`}>
            <Button size="lg" className="gradient-bg hover:scale-105 transition-transform duration-500 ease-in-out hover:cursor-pointer">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
