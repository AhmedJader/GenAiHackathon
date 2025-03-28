import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomeNavbar() {
  return (
    <header className="border-b border-border/40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            IntelliEarth
          </Link>
        </div>
        <div className="flex items-center gap-4">
          Logged in as User
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
