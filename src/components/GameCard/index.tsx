import Image from "next/image";
import Link from "next/link";
import { getDatabase, set, ref, remove, onValue } from "firebase/database";
import { motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";

import { Game } from "@/model/Game";
import { StarRater } from "../StarRater";
import { useEffect, useState } from "react";
import { firebaseApp } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";

const firebaseDb = getDatabase(firebaseApp);

type GameCardProps = Game;
export function GameCard({
  title,
  thumbnail,
  game_url,
  developer,
  freetogame_profile_url,
  genre,
  platform,
  release_date,
  short_description,
  id,
  publisher,
}: GameCardProps) {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [currentRating, setCurrentRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!!user) {
      const dataRef = ref(firebaseDb, `${user.uid}/favorites/${id}`);
      onValue(dataRef, (snapshot) => {
        if (snapshot.val() !== null) {
          return setIsFavorite(true);
        }
        setIsFavorite(false);
      });
    }
  }, [user]);

  async function toggleIsFavorite() {
    if (!!user) {
      const dataRef = ref(firebaseDb, `${user.uid}/favorites/${id}`);
      if (isFavorite) {
        return await remove(dataRef);
      }
      return await set(dataRef, {
        title,
        thumbnail,
        game_url,
        developer,
        freetogame_profile_url,
        genre,
        platform,
        release_date,
        short_description,
        id,
        publisher,
      });
    }
    replace("/auth/signIn");
  }

  return (
    <div className="max-w-[400px] min-w-[200px] h-96 flex flex-col">
      <h3 className="text-2xl mb-1 font-bold">{title}</h3>
      <Link
        href={game_url}
        target="_blank"
        className="flex-1 w-full flex flex-col"
      >
        <div className="flex-1 overflow-hidden relative rounded-lg">
          <motion.div
            className="relative h-full"
            whileHover={{ scale: 1.1 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <Image
              src={thumbnail}
              alt={`The thumbnail of the game ${title}`}
              fill
              className="object-cover"
              sizes="36"
            />
          </motion.div>
        </div>
      </Link>
      <div className="mt-1 flex flex-col items-start gap-1">
        <span className="text-purple-600 font-bold text-sm">{developer}</span>
        <p className="text-xs text-gray-400">{short_description}</p>
        <div className="w-full flex justify-between">
          <Heart
            size={24}
            className="cursor-pointer text-red-700"
            weight={isFavorite ? "fill" : "regular"}
            onClick={toggleIsFavorite}
          />
          <StarRater value={currentRating} setValue={setCurrentRating} />
        </div>
        <span className="bg-rose-600 text-sm text-rose-100 flex-0 px-1 rounded font-bold">
          {genre}
        </span>
        <div className="flex flex-row w-full justify-between">
          <span className="text-xs">Platform: {platform}</span>
          <span className="text-xs text-gray-300">Release: {release_date}</span>
        </div>
        <Link
          href={freetogame_profile_url}
          target="_blank"
          className="text-blue-500 text-sm font-bold underline"
        >
          Open freetogame
        </Link>
      </div>
    </div>
  );
}
