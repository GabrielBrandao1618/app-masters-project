"use client";

import { GameCard } from "@/components/GameCard";
import { SkeletonGameCard } from "@/components/GameCard/Skeleton";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useUserGameData } from "@/contexts/UserGameDataContext";
import { useGameQuery } from "@/hooks/useGameQuery";
import { GameGenre, gameGenres } from "@/model/GameGenre";
import {
  SortingMethod,
  getSortingMethodText,
  sortingMethods,
} from "@/model/SortingMethod";
import { Suspense, useState } from "react";

export default function FavoritesPage() {
  const {
    favoriteGames,
    isGameFavorite,
    getGameRating,
    toggleFavorite,
    setRating,
  } = useUserGameData();
  const [searchText, setSearchText] = useState("");
  const [selectedGameGenre, setSelectedGameGenre] = useState<GameGenre>("any");
  const [selectedSortingMethod, setSelectedSortingMethod] =
    useState<SortingMethod>(SortingMethod.None);

  const { user } = useAuth();

  const filteredFavoriteGames = useGameQuery(
    favoriteGames,
    selectedGameGenre,
    selectedSortingMethod,
    searchText
  );
  return (
    <>
      <Header />
      <main className="md:px-20 px-4 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center w-full max-w-[640px] gap-2 py-16">
          <h1 className="text-4xl font-bold mb-4">Favorite games</h1>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border-gray-500 border bg-transparent placeholder:text-gray-500 rounded px-3 py-2 w-full"
            placeholder="Search by game title"
          />
          <div className="flex flex-wrap w-full gap-2">
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded flex-1 min-w-[240px]">
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
            <div className="flex bg-transparent border border-gray-500 px-4 py-1 gap-2 rounded flex-1 min-w-[240px]">
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
        {favoriteGames.length > 0 ? (
          <div className="md:grid flex flex-col w-full items-center lg:grid-cols-3 md:grid-cols-2 gap-10 py-8">
            {filteredFavoriteGames.map((game) => {
              return (
                <Suspense key={game.id} fallback={<SkeletonGameCard />}>
                  {/*@ts-ignore async function component */}
                  <GameCard
                    {...game}
                    isFavorite={isGameFavorite(game.id)}
                    rating={getGameRating(game.id)}
                    onFavoriteClick={() => toggleFavorite(game)}
                    onRatingClick={(value) =>
                      setRating({
                        gameId: game.id,
                        value,
                      })
                    }
                  />
                </Suspense>
              );
            })}
          </div>
        ) : !!user ? (
          <div>
            <h2>
              No games found. Try adding some of your favorite games here.
            </h2>
          </div>
        ) : (
          <div>
            <h2>No favorite games found. You are currently not logged in.</h2>
          </div>
        )}
      </main>
    </>
  );
}
