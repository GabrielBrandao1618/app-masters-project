"use client";

import { GameCard } from "@/components/GameCard";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useUserGameData } from "@/contexts/UserGameDataContext";

export default function FavoritesPage() {
  const { favoriteGames, isGameFavorite, getGameRating } = useUserGameData();
  const { user } = useAuth();
  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-10 py-16">
        <h1 className="text-4xl font-bold">Favorite games</h1>
        {favoriteGames.length > 0 ? (
          <div className="md:grid flex flex-col items-center lg:grid-cols-3 md:grid-cols-2 gap-10">
            {favoriteGames.map((game) => {
              return (
                <GameCard
                  {...game}
                  isFavorite={isGameFavorite(game.id)}
                  rating={getGameRating(game.id)}
                  key={game.id}
                />
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
