'use client';
import Link from "next/link";
import React from "react";
import { NAV_LINKS } from "@/lib/constants";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-50 font-semibold rounded-2xl shadow-lg bg-[#0b0c0e] text-white">
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="text-lg hover:text-stone-400 hover:scale-105 transition-transform duration-300 ease-in-out">
          IntelliEarth
        </Link>
        
        {/* Desktop Navigation */}
        <div className="flex space-x-8">
          {NAV_LINKS.map((link, index) => (
            <Link key={index} href={link.href} className="hover:text-stone-400 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
