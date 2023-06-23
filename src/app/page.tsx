"use client";

import { useState, Suspense } from "react";
import { PulseLoader } from "react-spinners";
import { QueryClient, QueryClientProvider } from "react-query";
import { GamesSection } from "./(GamesSection)";
import { GameGenre, gameGenres } from "@/model/GameGenre";

const reactQueryClient = new QueryClient();

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedGameGenre, setSelectedGameGenre] = useState<GameGenre>("any");

  return (
    <QueryClientProvider client={reactQueryClient}>
      <main className="md:px-20 px-4 flex flex-col">
        <section className="flex flex-col items-center w-full gap-2">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-800 placeholder:text-gray-500 rounded px-2 py-1"
            placeholder="Search"
          />
          <select
            name="game-genre"
            id="game-genre"
            value={selectedGameGenre}
            onChange={(e) => setSelectedGameGenre(e.target.value as GameGenre)}
            className="bg-gray-800 px-2 py-1 rounded"
          >
            {gameGenres.map((genre) => {
              return (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
        </section>
        <div className="mt-4">
          <Suspense fallback={<GamesSectionFallback />}>
            {/* @ts-expect-error Async Server Component */}
            <GamesSection query={searchText} filterGenre={selectedGameGenre} />
          </Suspense>
        </div>
      </main>
    </QueryClientProvider>
  );
}

function GamesSectionFallback() {
  return (
    <div className="flex justify-center">
      <PulseLoader color="#ffffff" size={10} />
    </div>
  );
}
