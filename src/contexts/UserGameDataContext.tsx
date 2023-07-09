"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getDatabase, onValue, ref } from "firebase/database";

import { Game } from "@/model/Game";
import { useAuth } from "./AuthContext";
import { firebaseApp } from "@/lib/firebase";

const firebaseDb = getDatabase(firebaseApp);

interface Rating {
  value: number;
  gameId: number;
}

interface UserGameDataContextValue {
  favoriteGames: Game[];
  ratings: Rating[];
  isGameFavorite: (gameId: number) => boolean;
  getGameRating: (gameId: number) => number;
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

  return (
    <userGameDataContext.Provider
      value={{ favoriteGames, ratings, isGameFavorite, getGameRating }}
    >
      {children}
    </userGameDataContext.Provider>
  );
}

export function useUserGameData() {
  return useContext(userGameDataContext);
}
