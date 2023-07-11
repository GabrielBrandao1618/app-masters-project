import { Game } from "@/model/Game";

export async function fetchGames() {
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
  let data: Game[] = [];
  if (response.ok) {
    data = await response.json();
  }
  return {
    json: data,
    response: response,
  };
}
