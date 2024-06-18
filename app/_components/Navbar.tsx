"use client";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import React from "react";
import { verify } from "../(auth)/_actions/actions";

const loggedOutItems = [
  { name: "Login", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-background fixed top-0 z-10 flex h-14 w-full items-center justify-center border-b px-4">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href={"/"} className="text-xl font-black">
          Daily DSA
        </Link>
        <div className="space-x-4">
          {!isLoggedIn &&
            loggedOutItems.map((item) => (
              <Link href={item.href} key={item.name} className="font-medium">
                {item.name}
              </Link>
            ))}
          {isLoggedIn && (
            <div className="space-x-4">
              <Link href={"/ticker"} className="font-medium">
                Ticker
              </Link>
              <button className="font-medium" onClick={logoutUser}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
