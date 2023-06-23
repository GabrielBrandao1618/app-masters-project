"use client";

import { GameCard } from "@/components/GameCard";
import { Game } from "@/model/Game";
import { useMemo, useEffect, useState } from "react";

interface GamesSectionProps {
  query: string;
}

async function fetchGames() {
  return await fetch(
    process.env.API_URL ??
      "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
    {
      headers: {
        "dev-email-address":
          process.env.API_URL ?? "biel.brandao2004@gmail.com",
      },
    }
  );
}

export function GamesSection({ query }: GamesSectionProps) {
  const [data, setData] = useState<Game[]>([]);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [statusOk, setStatusOk] = useState(true);
  useEffect(() => {
    fetchGames().then((response) => {
      setStatusOk(response.ok);
      setStatus(response.status);
      if (response.ok) {
        response.json().then((games) => setData(games));
      }
    });
  }, []);
  let games = useMemo(() => {
    if (!!query) {
      return data.filter((game) => game.title.includes(query));
    }
    return data;
  }, [query, data]);

  if ([500, 502, 503, 504, 507, 508, 509].some((code) => code === status)) {
    return (
      <div className="flex flex-col items-center">
        <h2>The server failed responding. Try reloading the page.</h2>
      </div>
    );
  }

  if (!statusOk) {
    return (
      <div className="flex flex-col items-center">
        <h2>The server can't respond for now. Try again later.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-10">
      {games.map((game) => {
        return <GameCard {...game} key={game.id} />;
      })}
    </div>
  );
}
