'use client';
import Nav from "@/components/navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/quiz");
  };

  return (
    <main className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <Nav />

      <div className="load_animation flex flex-col items-center justify-center mx-auto text-center">
        <Image
          src="/bruh.webp"
          alt="IntelliEarth Logo"
          width={200}
          height={200}
          className="scale-200"
        />

        <h1 className="text-4xl font-bold text-white mb-20">
          Welcome to {" "}
          <span className="gradient-text">
            IntelliEarth!
          </span>
        </h1>

        <p className="text-md max-w-2xl text-white mt-[-20]">
          IntelliEarth is an {" "}
          <span className="gradient-text font-semibold animate-pulse">
            Agentic RAG-LLM
          </span> {" "}
          Pipelined {" "}
          <span className="gradient-text font-semibold animate-pulse">
            Personalized Tutor
          </span> {" "}
          that transforms static curricula into an interactive {" "}
          <span className="gradient-text font-semibold animate-pulse">
            AI-driven
          </span> {" "} learning system.
        </p>

        <div className="flex gap-4 mt-6">
          <Button
            size="lg"
            onClick={handleClick}
            className="gradient-bg hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("#learn")}
            className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
            size="lg"
          >
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
