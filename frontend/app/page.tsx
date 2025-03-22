import Nav from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* Background gradient */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Nav />

      <div className="load_animation flex flex-col items-center justify-center mx-auto mb-20">
        <Image
          src="/logo.webp"
          alt="IntelliEarth Logo"
          width={400}
          height={400}
          className="block max-w-sm mb-6 transition-all duration-100 ease-in-out"
        />
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-500 to-amber-900 bg-clip-text text-transparent">
              IntelliEarth!
            </span>
          </h1>
          
          <p className="text-md max-w-2xl mt-2 text-white">
            IntelliEarth is an <span className="bg-gradient-to-r font-semibold from-green-500 to-amber-900 bg-clip-text text-transparent animate-pulse">Agentic RAG-LLM</span> Pipelined <span className="bg-gradient-to-r font-semibold from-green-500 to-amber-900 bg-clip-text text-transparent animate-pulse"> Personalized Tutor </span> that transforms static curricula into an
            interactive <span className="bg-gradient-to-r from-green-500 font-semibold to-amber-900 bg-clip-text text-transparent animate-pulse"> AI-driven</span> learning system. By leveraging <span className="bg-gradient-to-r font-semibold from-green-500 to-amber-900 bg-clip-text text-transparent animate-pulse">Self Hosted</span> retrieval pipelines, local embeddings,
            and on-device inference, IntelliEarth delivers low-latency, <span className="bg-gradient-to-r font-semibold from-green-500 to-amber-900 bg-clip-text text-transparent animate-pulse">Privacy First</span>, and contextually aware tutoring,
            empowering students with adaptive, intelligent study assistance.
          </p>
        </div>
      </div>
    </main>
  );
}
