import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthedNavbar() {
  return (
    <header className="border-b border-border/40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            IntelliEarth
          </Link>
        </div>
        <div className="flex items-center gap-4">
          Example for Auth Navbar
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button variant="outline">My Account</Button>
        </div>
      </div>
    </header>
  );
}
