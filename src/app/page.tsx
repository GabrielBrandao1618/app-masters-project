"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GamesSection } from "@/components/layout/GamesSection";
import { GameGenre, gameGenres } from "@/model/GameGenre";
import { Header } from "@/components/Header";
import { SortingMethod, sortingMethods } from "@/model/SortingMethod";

const reactQueryClient = new QueryClient();

const sortingMethodText = new Map<SortingMethod, string>([
  [SortingMethod.Any, "Any"],
  [SortingMethod.RatingCrescent, "Rating crescent"],
  [SortingMethod.RatingDecrescent, "Rating decrescent"],
]);
function getSortingMethodText(key: SortingMethod) {
  return sortingMethodText.get(key) as string;
}

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedGameGenre, setSelectedGameGenre] = useState<GameGenre>("any");
  const [selectedSortingMethod, setSelectedSortingMethod] =
    useState<SortingMethod>(SortingMethod.Any);

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
            className="border-gray-500 border bg-transparent placeholder:text-gray-500 rounded px-2 py-1 w-full max-w-[280px]"
            placeholder="Search by game title"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded w-full max-w-[280px]">
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
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded w-full max-w-[280px]">
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
