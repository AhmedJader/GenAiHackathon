"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuizQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Example questions - you can replace these with your actual questions
  const questions = [
    {
      question: "Sample Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0
    },
    // Add more questions here
  ];

  return (
    <main className="flex min-h-screen items-center justify-center relative container mx-auto px-4 py-8 animate-fade duration-300 ease-in-out">
      <div className="max-w-2xl mx-auto mb-20">
        <h1 className="text-2xl font-bold mb-8">Quiz Questions</h1>
        
        {currentQuestion < questions.length ? (
          <div className="space-y-6">
            <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full hover:animate-pulse hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer text-left justify-start h-auto py-4 px-6"
                  onClick={() => {
                    // Handle answer selection here
                    if (index === questions[currentQuestion].correctAnswer) {
                      // Handle correct answer
                    }
                    // Move to next question
                    setCurrentQuestion(prev => prev + 1);
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <Button 
              onClick={() => setCurrentQuestion(0)}
              className="gradient-bg"
            >
              Restart Quiz
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
