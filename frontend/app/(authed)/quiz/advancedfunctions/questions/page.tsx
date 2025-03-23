"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function AdvancedFunctionsQuestions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [language, setLanguage] = useState("english");
  const [file, setFile] = useState<File | null>(null);

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
    if (!answers[currentQuestion].trim()) return;
    if (currentQuestion < assessmentInfo.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload your curriculum PDF.");
      return;
    }
  
    setLoading(true);
  
    try {
      const testAnswers = assessmentInfo.map((_, i) => ({
        question_number: i + 1,
        user_response: answers[i]
      }));
  
      const formData = new FormData();
      formData.append("language", language);
      formData.append("file", file);
      formData.append("test_answers", JSON.stringify(testAnswers));
  
      const response = await fetch("http://localhost:8000/quiz/answers", {
        method: "POST",
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        setRequestId(data.request_id);
        localStorage.setItem("request_id", data.request_id);
  
        // Navigate to /report only after LLM processing is fully done
        router.push("/report");
      } else {
        console.error("Failed to submit answers");
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("An error occurred while submitting your answers.");
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
          <h3 className="text-md font-semibold text-gray-200">Select Language</h3>
          <Select onValueChange={setLanguage} defaultValue="english">
            <SelectTrigger className="mt-2 w-full bg-[#252525] text-white border border-gray-600 rounded-lg">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="mandarin">Mandarin</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-200">Upload Curriculum PDF</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-2 hover:cursor-pointer text-red-800 w-full text-sm"
            title="Upload Curriculum PDF"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-200">Previous Answers</h3>
          <ul className="mt-2 text-sm text-gray-400 space-y-1">
            {answers.map((answer, index) => (
              <li key={index} className="truncate">
                <strong>Q{index + 1}:</strong> {answer || "Not answered"}
              </li>
            ))}
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

              <Input
                type="text"
                value={answers[currentQuestion]}
                onChange={handleInputChange}
                placeholder="Type your answer here..."
                className="mt-4 p-3 w-full bg-[#252525] text-white border border-gray-600 rounded-lg"
              />

              {requestId && (
                <p className="mt-3 text-sm text-gray-400">
                  Answers submitted! Request ID:{" "}
                  <span className="text-green-400">{requestId}</span>
                </p>
              )}

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
