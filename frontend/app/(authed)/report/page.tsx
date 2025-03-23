"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [learningPath, setLearningPath] = useState("");
  const [resources, setResources] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      const requestId = localStorage.getItem("request_id");
      if (!requestId) return;
  
      try {
        const response = await fetch(`http://localhost:8000/quiz/answers/${requestId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch report");
        }
  
        const parsed = await response.json();
  
        setLearningPath(parsed.learning_path);
        setResources(parsed.resources);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReport();
  }, []);

  if (loading) return <div className="text-white p-10">Loading report...</div>;

  return (
    <main className="min-h-screen bg-[#121212] text-white p-10 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-400">📘 Personalized Learning Path</h2>
        <div className="bg-[#1E1E1E] p-6 rounded-lg border border-gray-700 prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{learningPath}</ReactMarkdown>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-400">🎥 Suggested Resources</h2>
        <div className="bg-[#1E1E1E] p-6 rounded-lg border border-gray-700 prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{resources}</ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
