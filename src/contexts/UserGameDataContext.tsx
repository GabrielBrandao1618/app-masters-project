"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getDatabase, onValue, ref, remove, set } from "firebase/database";

import { Game } from "@/model/Game";
import { useAuth } from "./AuthContext";
import { firebaseDb } from "@/lib/firebase";

interface Rating {
  value: number;
  gameId: number;
}

interface UserGameDataContextValue {
  favoriteGames: Game[];
  ratings: Rating[];
  isGameFavorite: (gameId: number) => boolean;
  getGameRating: (gameId: number) => number;
  toggleFavorite: (game: Game) => Promise<void>;
  setRating: (rating: Rating) => Promise<void>;
}

const userGameDataContext = createContext({} as UserGameDataContextValue);

interface UserGameDataContextProviderProps {
  children: ReactNode;
}
export function UserGameDataContextProvider({
  children,
}: UserGameDataContextProviderProps) {
  const { user } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const unsubscribeFns: (() => void)[] = [];
    if (!!user) {
      const favoritesRef = ref(firebaseDb, `${user.uid}/favorites`);
      const unsubscribeFavorites = onValue(favoritesRef, (snapshot) => {
        const val = snapshot.val();
        if (!!val) {
          const parsedSnapshot: Game[] = Object.entries(val).map(([_, val]) => {
            return val;
          }) as Game[];
          return setFavoriteGames(parsedSnapshot);
        }
        setFavoriteGames([]);
      });
      unsubscribeFns.push(unsubscribeFavorites);

      const ratingsRef = ref(firebaseDb, `${user.uid}/ratings`);
      const unsubscribeRatings = onValue(ratingsRef, (snapshot) => {
        const val = snapshot.val();
        if (!!val) {
          const parsedSnapshot = Object.entries(val).map(([key, val]) => {
            return {
              gameId: Number(key),
              value: val as number,
            };
          }) as Rating[];
          setRatings(parsedSnapshot);
        }
      });
      unsubscribeFns.push(unsubscribeRatings);
    } else {
      setRatings([]);
      setFavoriteGames([]);
    }

    return () => {
      for (const unsubscribe of unsubscribeFns) {
        unsubscribe();
      }
    };
  }, [user]);

  const isGameFavorite = useCallback(
    (gameId: number) => {
      return favoriteGames.some((game) => game.id === gameId);
    },
    [favoriteGames]
  );
  const getGameRating = useCallback(
    (gameId: number) => {
      const foundGameRating = ratings.find(
        (rating) => rating.gameId === gameId
      );
      if (!!foundGameRating) {
        return foundGameRating.value;
      }
      return 0;
    },
    [ratings]
  );

  const toggleFavorite = useCallback(
    async (game: Game) => {
      if (!!user) {
        const isFavorite = favoriteGames.some((data) => game.id === data.id);
        const dataRef = ref(firebaseDb, `${user.uid}/favorites/${game.id}`);
        if (isFavorite) {
          return await remove(dataRef);
        }
        await set(dataRef, game);
      }
    },
    [favoriteGames, user]
  );

  const setRating = useCallback(
    async (rating: Rating) => {
      if (!!user) {
        const dataRef = ref(firebaseDb, `${user.uid}/ratings/${rating.gameId}`);
        set(dataRef, rating.value);
      }
    },
    [user]
  );

  return (
    <userGameDataContext.Provider
      value={{
        favoriteGames,
        ratings,
        isGameFavorite,
        getGameRating,
        toggleFavorite,
        setRating,
      }}
    >
      {children}
    </userGameDataContext.Provider>
  );
}

export function useUserGameData() {
  return useContext(userGameDataContext);
}
