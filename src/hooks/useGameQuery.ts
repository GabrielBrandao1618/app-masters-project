import { useUserGameData } from "@/contexts/UserGameDataContext";
import { Game } from "@/model/Game";
import { GameGenre } from "@/model/GameGenre";
import { SortingMethod } from "@/model/SortingMethod";
import { useMemo } from "react";
import { useDebounce } from "./useDebounce";

export function useGameQuery(
  games: Game[],
  filterGenre: GameGenre,
  sortingMethod: SortingMethod,
  queryTitle: string
) {
  const { getGameRating } = useUserGameData();
  return useDebounce(
    useMemo(() => {
      let data = games.filter(
        (game) =>
          game.title.toLowerCase().includes(queryTitle.toLowerCase()) &&
          (filterGenre === "any" ? true : filterGenre === game.genre)
      );
      if (
        sortingMethod == SortingMethod.RatingCrescent ||
        sortingMethod == SortingMethod.RatingDecrescent
      ) {
        data.sort((a, b) => {
          if (sortingMethod == SortingMethod.RatingDecrescent) {
            return getGameRating(b.id) - getGameRating(a.id);
          }
          if (sortingMethod == SortingMethod.RatingCrescent) {
            return getGameRating(a.id) - getGameRating(b.id);
          }
          return 0;
        });
      }
      return data;
    }, [games, filterGenre, sortingMethod, queryTitle]),
    500
  );
}
