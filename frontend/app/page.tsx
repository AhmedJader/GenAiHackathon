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

      <div className="animate-fade-down transition-all mt-20 duration-1000 ease-in-out flex flex-col items-center justify-center mx-auto text-center">
        <Image
          src="/bruh.webp"
          alt="IntelliEarth Logo"
          width={200}
          height={200}
          className="scale-200"
        />

        <h1 className="text-4xl font-bold text-white mb-20">
          Your Self-Hosted {" "}
          <span className="gradient-text">
            Agentic Tutor
          </span>
        </h1>

        <p className="text-md max-w-2xl text-white mt-[-40]">
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
            onClick={() => router.push("/dashboard")}
            className="hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
            size="lg"
          >
            Learn More
          </Button>
        </div>
        <Image
          src="/overlay.webp"
          alt="IntelliEarth Logo"
          width={500}
          height={500}
          className="fixed top-145 z-20"
          />

        {/* IntelliEarth Logo and View Image with Radial Blur Effect */}
        <div className="relative mt-10">
          <Image
            src="/view.jpg"
            alt="IntelliEarth Logo"
            width={1000}
            height={1000}
            className="mt-10 border-8 border-gray-500 rounded-lg shadow-2xl"
          />

          {/* Radial Gradient Overlay for Blur Effect at the Bottom of the Image */}
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white to-transparent"></div>
        </div>

      </div>
    </main>
  );
}
