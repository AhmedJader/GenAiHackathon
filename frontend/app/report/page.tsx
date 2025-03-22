import Nav from "@/components/navbar";
import CurriculumUploader from "@/components/curriculumuploader";

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center relative">
      {/* Background gradient */}
      <div className="absolute top-0 z-[-2] pointer-events-none h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Nav />

      <div className="">
      <CurriculumUploader />
      </div>
    </main>
  );
}
