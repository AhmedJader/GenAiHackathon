"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdvancedFunctionsQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(3).fill(null)
  );

  const questions = [
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to variables in its outer scope",
        "A function that only uses local variables",
        "A function that cannot access outer variables",
        "A function without parameters",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement about arrow functions is correct?",
      options: [
        "They always require parentheses around parameters",
        "They have their own 'this' binding",
        "They inherit 'this' from the enclosing scope",
        "They can be used as constructors",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is function currying?",
      options: [
        "Converting a function into an arrow function",
        "Transforming a function that takes multiple arguments into a sequence of functions that take a single argument",
        "Making a function return undefined",
        "Combining two functions into one",
      ],
      correctAnswer: 1,
    },
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setCurrentQuestion(questionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswers.includes(null)) {
      alert("Please answer all questions before submitting!");
      return;
    }
    // Calculate and show results
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    alert(`Your score: ${score}/${questions.length}`);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 animate-fade-down">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          className="object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
          src="/advanced.png"
          alt="advanced function"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm flex items-center px-40">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-white tracking-tight">
              Advanced Functions
              <p className="text-3xl mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Assessment
              </p>
            </h1>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-40 py-16">
        <div className="flex gap-8">
          {/* Questions Section */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl backdrop-blur-md p-10">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">
                    Question {currentQuestion + 1}
                  </h2>
                  <span className="px-4 py-2 bg-blue-100 text-black font-semibold rounded-full text-sm">
                    {selectedAnswers[currentQuestion] !== null
                      ? "Answered"
                      : "Not answered"}
                  </span>
                </div>

                <h3 className="text-xl text-black font-medium">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full text-left justify-start h-auto py-6 px-8 text-lg transition-all duration-300 text-black hover:text-black ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-blue-500 bg-blue-50 text-black font-medium"
                          : "hover:bg-gray-50 hover:border-blue-500"
                      }`}
                      onClick={() => handleAnswerSelect(currentQuestion, index)}
                    >
                      <span className="mr-4 text-black  font-bold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 py-6 px-8 text-lg transition-all duration-300 text-black font-medium ${
                      currentQuestion === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:text-black hover:border-blue-500"
                    }`}
                    onClick={() =>
                      currentQuestion > 0 &&
                      setCurrentQuestion((current) => current - 1)
                    }
                    disabled={currentQuestion === 0}
                  >
                    ← Previous
                  </Button>
                  <span className="text-black font-medium">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 py-6 px-8 text-lg transition-all duration-300 text-black font-medium ${
                      currentQuestion === questions.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:text-black hover:border-blue-500"
                    }`}
                    onClick={() =>
                      currentQuestion < questions.length - 1 &&
                      setCurrentQuestion((current) => current + 1)
                    }
                    disabled={currentQuestion === questions.length - 1}
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-xl backdrop-blur-md p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200 text-black">
                Questions Progress
              </h3>
              <div className="space-y-4 mb-6">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      currentQuestion === index
                        ? "bg-blue-500 text-white font-medium"
                        : selectedAnswers[index] !== null
                        ? "bg-green-100 text-black font-medium"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    <span className="font-medium">Question {index + 1}</span>
                    {selectedAnswers[index] !== null && (
                      <span className="text-sm font-medium">
                        Answer:{" "}
                        {String.fromCharCode(65 + selectedAnswers[index])}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-green-400 hover:bg-green-300 text-lg py-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white font-medium"
                onClick={handleSubmit}
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
