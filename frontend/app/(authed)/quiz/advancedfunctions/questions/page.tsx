"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdvancedFunctionsQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill("")); // Store all answers
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

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
    "If f(x) = x^2 and g(x) = 2x + 3, find f(g(1)).",
  ];

  const handleNext = () => {
    if (!answers[currentQuestion].trim()) return; // Prevent moving forward if input is empty
    if (currentQuestion < assessmentInfo.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const testAnswers = [];
      const language = "english";

      for (let i = 0; i < assessmentInfo.length; i++) {
        testAnswers.push({ question_number: i, user_response: answers[i] });
      }

      const response = await fetch("http://localhost:8000/quiz/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test_answers: testAnswers, language: language }),
      });

      if (response.ok) {
        const data = await response.json();
        setRequestId(data.request_id);
      } else {
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#121212] text-white animate-fade-down transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside className="w-1/5 bg-[#1E1E1E] p-6 border-r border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">
          Advanced Functions Assessment
        </h2>

        <div className="mt-4 text-sm text-gray-400">
          <p>
            Question {currentQuestion + 1}: {assessmentInfo[currentQuestion]}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-200">Progress</h3>
          <p className="text-sm text-gray-400">
            Question {currentQuestion + 1} / {assessmentInfo.length}
          </p>
        </div>

        {/* Display stored answers */}
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-200">Your Answers</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-400">
            {answers.map(
              (answer, index) =>
                answer.trim() && (
                  <li key={index} className="border-b border-gray-600 pb-1">
                    <span className="text-blue-400">Q{index + 1}:</span>{" "}
                    {assessmentInfo[index]}
                    <br />
                    <span className="text-green-400">A:</span> {answer}
                  </li>
                )
            )}
          </ul>
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
              <p className="text-lg text-gray-300">
                {assessmentInfo[currentQuestion]}
              </p>

              {/* User Input */}
              <Input
                type="text"
                value={answers[currentQuestion]}
                onChange={handleInputChange}
                placeholder="Type your answer here..."
                className="mt-4 p-3 w-full bg-[#252525] text-white border border-gray-600 rounded-lg"
              />

              {/* Display request ID if available */}
              {requestId && (
                <p className="mt-3 text-sm text-gray-400">
                  Answers submitted! Request ID:{" "}
                  <span className="text-green-400">{requestId}</span>
                </p>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                  Question {currentQuestion + 1} / {assessmentInfo.length}
                </p>
                {currentQuestion < assessmentInfo.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition"
                  >
                    Next Question →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition"
                  >
                    {loading ? "Submitting..." : "Submit Answers"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
