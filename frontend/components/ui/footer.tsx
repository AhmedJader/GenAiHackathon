import Link from "next/link";
import React from "react";
import { SiDevpost, SiGithub } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-black/50 py-6">
      <div className="container max-w-screen-lg mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} IntelliEarth. All rights reserved.
          </p>
          <div className="flex gap-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <SiGithub size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <SiDevpost size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
