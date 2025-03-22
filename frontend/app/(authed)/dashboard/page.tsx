import OpenAIPower from "@/components/openaistats";
import OurPower from "@/components/selfstats";
import Savings from "@/components/savingstats";
import Nav from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Background gradient
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Nav />

      <div className="scale-70 animate-fade animate-duration-2000">
        <OpenAIPower />
      </div>

      <div className="scale-70 animate-fade animate-duration-2000">
        <OurPower />
      </div>

      <div className="scale-70 animate-fade animate-duration-2000">
        <Savings />
      </div> */}
    </div>
  );
}
