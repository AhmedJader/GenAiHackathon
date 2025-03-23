"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdvancedFunctionsQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const assessmentInfo = [
    "Solve for x: 3^x = 81",
    "Simplify: log(1000) - log(10)",
    "Convert 90° to radians.",
    "Determine the exact value: sin(π/4) * cos(π/4)",
    "State the vertical asymptote of: f(x) = 1 / (x^2 - 9)",
    "Given f(x) = (x - 2)(x + 1)(x - 5), list all x-intercepts.",
    "Given f(x) = x^2 + 2x, find the average rate of change from x = 1 to x = 4.",
    "What is the vertical stretch factor of the function: f(x) = 3sin(x)",
    "Solve for x: log(5x + 6) = 2",
    "If f(x) = x^2 and g(x) = 2x + 3, find f(g(1))."
  ];

  const handleNext = () => {
    if (currentQuestion < assessmentInfo.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserInput(""); // Reset input for next question
      setRequestId(null); // Clear previous request ID
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ question: assessmentInfo[currentQuestion], answer: userInput }]),
      });

      if (response.ok) {
        const data = await response.json();
        setRequestId(data.request_id);
      } else {
        console.error("Failed to submit answer");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#121212] text-white animate-fade-down transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside className="w-1/5 bg-[#1E1E1E] p-6 border-r border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Advanced Functions Assessment</h2>
        <ul className="mt-4 text-sm text-gray-400 space-y-2">
          <li>Question {currentQuestion + 1}: {assessmentInfo[currentQuestion]}</li>
        </ul>
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-200">Progress</h3>
          <p className="text-sm text-gray-400">Question {currentQuestion + 1} / {assessmentInfo.length}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <Card className="bg-[#1E1E1E] border border-gray-700 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold text-gray-100">
                Advanced Functions Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-300">{assessmentInfo[currentQuestion]}</p>

              {/* User Input */}
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer here..."
                className="mt-4 p-3 w-full bg-[#252525] text-white border border-gray-600 rounded-lg"
              />

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit} 
                disabled={loading} 
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 mt-4 rounded-lg transition"
              >
                {loading ? "Submitting..." : "Submit Answer"}
              </Button>

              {/* Display request ID if available */}
              {requestId && (
                <p className="mt-3 text-sm text-gray-400">
                  Answer submitted! Request ID: <span className="text-green-400">{requestId}</span>
                </p>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                  Question {currentQuestion + 1} / {assessmentInfo.length}
                </p>
                <Button 
                  onClick={handlePrevious} 
                  disabled={currentQuestion === 0}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                >
                  ← Previous Question
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={currentQuestion === assessmentInfo.length - 1}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                >
                  Next Question →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
