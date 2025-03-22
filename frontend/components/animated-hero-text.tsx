"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedHeroText() {
  const words = [
    { text: "your wallet", emoji: "🤑" },
    { text: "the environment", emoji: "🌲" },
    { text: "you", emoji: "🎯" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <h1 className="text-4xl font-bold">
      Designed for{" "}
      <span className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentIndex].text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="gradient-text">{words[currentIndex].text}</span>
            <span>{words[currentIndex].emoji}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
