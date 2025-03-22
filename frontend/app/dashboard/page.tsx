import OpenAIPower from "@/components/openaistats";
import OurPower from "@/components/selfstats";
import Savings from "@/components/savingstats";

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-800">
      <OpenAIPower />
      <OurPower />
      <Savings />
    </main>
  );
}

