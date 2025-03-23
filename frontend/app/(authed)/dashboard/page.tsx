import OpenAIPower from "@/components/openaistats";
import OurPower from "@/components/selfstats";
import Savings from "@/components/savingstats";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="animate-fade-down transition-all duration-500 ease-in-out flex flex-col items-center justify-center mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold text-white">
          How Efficient is our
          <span className="gradient-text"> Method?</span>
          <ul className="flex flex-row gap-3 scale-90 items-center justify-center">
            <OpenAIPower />
            <OurPower />
            <Savings />
          </ul>
        </h1>
      </div>
    </main>
  );
}
