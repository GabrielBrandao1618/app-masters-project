"use client";

import { useState, Suspense } from "react";
import { GamesSection } from "./(GamesSection)";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <main className="px-20">
      <section className="flex flex-col items-center w-full gap-2">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-gray-800 placeholder:text-gray-500 rounded px-2 py-1"
          placeholder="Search"
        />
      </section>
      <Suspense>
        <GamesSection query={searchText} />
      </Suspense>
    </main>
  );
}
