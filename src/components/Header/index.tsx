import { redirect } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="p-4 flex justify-end items-center">
      {!!user ? (
        <button
          onClick={signOut}
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
