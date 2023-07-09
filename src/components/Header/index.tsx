"use client";

import { redirect, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <header className="p-4 flex gap-4 justify-end items-center fixed bg-transparent backdrop-blur-md w-full z-10">
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
    </header>
  );
}
