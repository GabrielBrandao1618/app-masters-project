"use client";

import { GameCard } from "@/components/GameCard";
import { Game } from "@/model/Game";
import { GameGenre } from "@/model/GameGenre";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { useMemo, useEffect, useState } from "react";
import { useUserGameData } from "@/contexts/UserGameDataContext";

async function fetchGames() {
  const response = await fetch(
    process.env.API_URL ??
      "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
    {
      headers: {
        "dev-email-address":
          process.env.DEV_EMAIL_ADDRESS ?? "biel.brandao2004@gmail.com",
      },
    }
  );
  const json = await response.json();
  return {
    json: json as Game[],
    response: response,
  };
}
interface GamesSectionProps {
  query: string;
  filterGenre: GameGenre;
}

export function GamesSection({ query, filterGenre }: GamesSectionProps) {
  const { isGameFavorite, getGameRating } = useUserGameData();
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
  let games = useMemo(() => {
    if (queryResult?.response?.ok) {
      return queryResult.json.filter(
        (game) =>
          game.title.toLowerCase().includes(query.toLowerCase()) &&
          (filterGenre !== "any" ? game.genre === filterGenre : true)
      );
    }
    return [];
  }, [query, queryResult, filterGenre]);

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
    <div className="md:grid flex flex-col items-center lg:grid-cols-3 md:grid-cols-2 gap-10">
      {games.map((game) => {
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
  );
}
