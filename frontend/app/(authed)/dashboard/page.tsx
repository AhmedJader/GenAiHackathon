import OpenAIPower from "@/components/openaistats";
import OurPower from "@/components/selfstats";
import Savings from "@/components/savingstats";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold text-white">
          How Efficient is our
          <span className="gradient-text"> Method?</span>
        </h1>
      </div>

      <div className="flex flex-row justify-center space-x-8 scale-70 animate-fade animate-duration-2000">
        <OpenAIPower />
        <OurPower />
        <Savings />
      </div>
    </main>
  );
}
