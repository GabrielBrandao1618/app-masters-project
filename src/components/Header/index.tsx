"use client";

import { redirect, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <header className="px-4 flex gap-4 fixed bg-transparent backdrop-blur-md w-full z-10">
      <div className="relative xsm:flex items-center gap-4 hidden">
        <Image
          src="/logo-white.svg"
          alt="A video-game controller"
          className="justify-self-start object-cover"
          width={64}
          height={64}
        />
      </div>
      <nav className="flex flex-1 flex-wrap justify-end items-center py-2 gap-4">
        <Link
          href="/"
          className={`${pathname === "/" ? "font-bold" : "font-normal"}`}
        >
          Home
        </Link>
        {!!user && (
          <Link
            href="/favorites"
            className={`${
              pathname === "/favorites" ? "font-bold" : "font-normal"
            }`}
          >
            Favorites
          </Link>
        )}

        {!!user ? (
          <button
            onClick={async () => {
              await signOut();
              replace("/");
            }}
            className="px-2 py-1 font-bold border border-gray-100 rounded hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => {
              redirect("/auth/signIn");
            }}
            className="px-2 py-1 font-bold border border-gray-100 rounded hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <Link href="/auth/signIn">Sign in</Link>
          </button>
        )}
      </nav>
    </header>
  );
}
