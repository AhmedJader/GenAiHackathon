"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdvancedFunctionsQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to variables in its outer scope",
        "A function that only uses local variables",
        "A function that cannot access outer variables",
        "A function without parameters"
      ],
      correctAnswer: 0
    },
    {
      question: "Which statement about arrow functions is correct?",
      options: [
        "They always require parentheses around parameters",
        "They have their own 'this' binding",
        "They inherit 'this' from the enclosing scope",
        "They can be used as constructors"
      ],
      correctAnswer: 2
    },
    {
      question: "What is function currying?",
      options: [
        "Converting a function into an arrow function",
        "Transforming a function that takes multiple arguments into a sequence of functions that take a single argument",
        "Making a function return undefined",
        "Combining two functions into one"
      ],
      correctAnswer: 1
    }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Advanced Functions Quiz</h1>
        
        {currentQuestion < questions.length ? (
          <div className="space-y-6">
            <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto py-4 px-6"
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
