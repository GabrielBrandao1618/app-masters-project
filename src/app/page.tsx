"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GamesSection } from "@/components/layout/GamesSection";
import { GameGenre, gameGenres } from "@/model/GameGenre";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";

const reactQueryClient = new QueryClient();

export default function Home() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedGameGenre, setSelectedGameGenre] = useState<GameGenre>("any");

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Header />
      <main className="md:px-20 px-4 flex flex-col">
        <section className="flex flex-col items-center w-full gap-2 py-16">
          <h2 className="text-4xl font-bold mb-4">App Masters game store</h2>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border-gray-500 border bg-transparent placeholder:text-gray-500 rounded px-2 py-1 w-full max-w-[240px]"
            placeholder="Search by game title"
          />
          <select
            name="game-genre"
            id="game-genre"
            value={selectedGameGenre}
            onChange={(e) => setSelectedGameGenre(e.target.value as GameGenre)}
            className="bg-transparent border border-gray-500 px-4 py-1 rounded w-full max-w-[240px] font-bold"
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
          <GamesSection query={searchText} filterGenre={selectedGameGenre} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
