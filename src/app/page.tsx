"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GamesSection } from "@/components/layout/GamesSection";
import { GameGenre, gameGenres } from "@/model/GameGenre";
import { Header } from "@/components/Header";
import {
  SortingMethod,
  getSortingMethodText,
  sortingMethods,
} from "@/model/SortingMethod";

const reactQueryClient = new QueryClient();

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedGameGenre, setSelectedGameGenre] = useState<GameGenre>("any");
  const [selectedSortingMethod, setSelectedSortingMethod] =
    useState<SortingMethod>(SortingMethod.None);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Header />
      <main className="md:px-20 px-4 flex flex-col items-center">
        <section className="flex flex-col items-center w-full max-w-[640px] gap-2 py-16">
          <h2 className="text-4xl font-bold mb-4">App Masters game store</h2>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border-gray-500 border bg-transparent placeholder:text-gray-500 rounded px-3 py-2 w-full"
            placeholder="Search by game title"
          />
          <div className="flex w-full gap-2">
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded flex-1">
              <span>Genre</span>
              <select
                name="game-genre"
                id="game-genre"
                value={selectedGameGenre}
                onChange={(e) =>
                  setSelectedGameGenre(e.target.value as GameGenre)
                }
                className="bg-transparent flex-1 font-bold text-right"
              >
                {gameGenres.map((genre) => {
                  return (
                    <option value={genre} key={genre}>
                      {genre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded flex-1">
              <span>Sort by</span>
              <select
                name="sort-method"
                id="sort-method"
                className="bg-transparent flex-1 font-bold text-right"
                value={selectedSortingMethod}
                onChange={(e) =>
                  setSelectedSortingMethod(
                    e.target.value as unknown as SortingMethod
                  )
                }
              >
                {sortingMethods.map((method) => {
                  return (
                    <option value={method} key={method}>
                      {getSortingMethodText(method)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </section>
        <div className="mt-4">
          <GamesSection
            query={searchText}
            filterGenre={selectedGameGenre}
            sortingMethod={selectedSortingMethod}
          />
        </div>
      </main>
    </QueryClientProvider>
  );
}
