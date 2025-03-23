"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/navbar";

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
    <main className="flex flex-col bg-[#121212] text-white">
      <header className="sticky top-0 z-50 bg-[#1E1E1E] border-b border-gray-800 shadow-md">
        <Navbar />
      </header>

      <article className="max-w-4xl flex mt-20 flex-row gap-4 mx-auto px-6 py-12 md:px-10 space-y-20">
        {/* Learning Path */}
        <section>
          <h2 className="text-3xl md:text-4xl font-extrabold font-mono text-green-400 text-center">
            📘 Personalized Learning Path
          </h2>
          <div className="bg-[#1E1E1E] mt-8 p-6 md:p-10 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="prose prose-invert prose-lg max-w-prose mx-auto leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {learningPath}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Suggested Resources */}
        <section>
          <h2 className="text-3xl md:text-4xl font-extrabold font-mono text-blue-400 text-center mb-8">
            🎥 Suggested Resources
          </h2>
          <div className="bg-[#1E1E1E] p-6 md:p-10 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="prose prose-invert prose-lg max-w-prose mx-auto leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {resources}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
