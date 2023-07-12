"use client";

import { GameCard } from "@/components/GameCard";
import { GameGenre } from "@/model/GameGenre";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { Suspense, useEffect, useState } from "react";
import { useUserGameData } from "@/contexts/UserGameDataContext";
import { SortingMethod } from "@/model/SortingMethod";
import { useGameQuery } from "@/hooks/useGameQuery";
import { fetchGames } from "@/lib/api/fetchGames";
import { SkeletonGameCard } from "../GameCard/Skeleton";

interface GamesSectionProps {
  query: string;
  filterGenre: GameGenre;
  sortingMethod: SortingMethod;
}

export function GamesSection({
  query,
  filterGenre,
  sortingMethod,
}: GamesSectionProps) {
  const { isGameFavorite, getGameRating, setRating, toggleFavorite } =
    useUserGameData();
  const { data: queryResult, isLoading } = useQuery({
    queryFn: fetchGames,
    staleTime: Infinity,
  });

  const [timeoutExcepted, setTimeoutExcepted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setTimeoutExcepted(true);
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const games = useGameQuery(
    queryResult?.json ?? [],
    filterGenre,
    sortingMethod,
    query
  );
  if (timeoutExcepted) {
    return (
      <div className="flex flex-col items-center">
        <h2>The server delayed to respond. Try again later.</h2>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <PulseLoader color="#ffffff" size={10} />
      </div>
    );
  }

  if (
    [500, 502, 503, 504, 507, 508, 509].some(
      (code) => code === queryResult?.response?.status
    )
  ) {
    return (
      <div className="flex flex-col items-center">
        <h2>The server failed responding. Try reloading the page.</h2>
      </div>
    );
  }

  if (!queryResult?.response?.ok && !isLoading) {
    return (
      <div className="flex flex-col items-center">
        <h2>The server cannot respond for now. Try again later.</h2>
      </div>
    );
  }

  return (
    <div className="md:grid flex w-full flex-col items-center lg:grid-cols-3 md:grid-cols-2 gap-10 py-8 min-h-[640px]">
      {games.map((game) => {
        return (
          <Suspense fallback={<SkeletonGameCard />} key={game.id}>
            {/*@ts-ignore async function component*/}
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
  );
}
