import Nav from "@/components/navbar";
import CurriculumUploader from "@/components/curriculumuploader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz</h1>
        <p className="text-lg text-muted-foreground mb-8">Ready to test your knowledge?</p>
        <Link href="/quiz/questions">
          <Button size="lg" className="gradient-bg">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
