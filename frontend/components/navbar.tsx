"use client";
import Link from "next/link";
import React from "react";
import { NAV_LINKS } from "@/lib/constants";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed text-black  bg-white/60 backdrop-blur-md top-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-50 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
      <div className="flex justify-between items-center p-4">
        <Link
          href="/"
          className="text-lg hover:text-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          IntelliEarth
        </Link>

        {/* Desktop Navigation */}
        <div className="flex space-x-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-gray-50 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;