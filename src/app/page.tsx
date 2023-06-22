import { Game } from "./model/Game";
import { GameCard } from "@/components/GameCard";

export default async function Home() {
  const response = await fetch(
    process.env.API_URL ??
      "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
    {
      headers: {
        "dev-email-address":
          process.env.API_URL ?? "biel.brandao2004@gmail.com",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      "Error trying to search the games. Reload the page to try again"
    );
  }
  const data: Game[] = await response.json();

  return (
    <main className="px-20">
      <div className="grid grid-cols-3 gap-10">
        {data.map((game) => {
          return <GameCard {...game} />;
        })}
      </div>
    </main>
  );
}
