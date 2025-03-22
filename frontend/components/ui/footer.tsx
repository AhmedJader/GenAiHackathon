import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { SiDevpost, SiGithub } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-black/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IntelliEarth. Created By Miguel
            Advincula, Yusuf Moola, Francis Kafieh, Ahmed Abduljader
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <SiGithub />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <SiDevpost />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
