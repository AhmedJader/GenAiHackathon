"use client";
import AnimatedHeroText from "@/components/animated-hero-text";
import Nav from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HomeNavbar from "@/components/ui/home-navbar";

import { useRouter } from "next/navigation";

import { ChevronRight, Code, BookOpen, Award, Users, Zap } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/quiz");
  };
  return (
    <div className="flex flex-col dark">
      <HomeNavbar />

      <div className="flex-1 animate-fade-down">
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                    <span className="gradient-text ">Smarter</span> Learning,{" "}
                    <span className="gradient-text">Bigger</span> Impact.
                  </h1>
                </div>
                <AnimatedHeroText />
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button size="lg" onClick={handleClick} className="gradient-bg hover:scale-105 transition-transform duration-500 ease-in-out hover:cursor-pointer">
                    Get Started
                  </Button>
                  <Button variant="outline" onClick={() => router.push("#learn")} className="hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="flex items-center flex-col">
                <div className="flex justify-center items-center">
                  <Image
                    src="/logo.webp"
                    alt="Hero Image"
                    className="animate-pulse"
                    width={500}
                    height={500}
                  />
                </div>

                {/* <div className="absolute top-1/2 right-20 md:right-50 lg:right-120 transform translate-x-1/4 -translate-y-1/2 w-100 h-75 bg-gradient-to-br from-green-500 to-indigo-400 rounded-full opacity-70 blur-2xl hero-sphere glow z-1"></div> */}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/10 load_animation">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Left-Aligned <span className="gradient-text">About</span>{" "}
                Section Etc
              </h2>
              <p className="text-lg text-muted-foreground" id="learn">
                IntelliEarth is an <span className="gradient-text animate-pulse"> Agentic RAG-LLM </span> Pipelined Personalized Tutor
                that transforms static curricula into an interactive AI-driven
                learning system. By leveraging <span className="gradient-text animate-pulse"> Self Hosted </span> retrieval pipelines,
                local embeddings, and on-device inference, IntelliEarth delivers
                low-latency, Privacy First, and contextually aware tutoring,
                empowering students with adaptive, intelligent study assistance.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Left Two-Col <span className="gradient-text">Section!</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum.
                </p>
                <Button className="gradient-bg">Try it out!</Button>
              </div>
              <div>
                <h3>maybe another photo here or some more text</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Section of <span className="gradient-text">Cards</span> Heading
                Etc
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A nice subheading!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-r from-green-500/30 to-indigo-400/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Probably have some stats here of us vs CGPT, etc
                </h2>
                <p className="text-lg mb-8">Subheading</p>
              </div>
              <div>
                <Card>make this a hollow card for example</Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
