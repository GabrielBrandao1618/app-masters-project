import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";

import { Game } from "@/model/Game";
import { StarRater } from "../StarRater";

type GameCardProps = Game & {
  isFavorite: boolean;
  rating: number;
  onFavoriteClick: () => Promise<void> | void;
  onRatingClick: (value: number) => Promise<void> | void;
};
export async function GameCard(props: GameCardProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className="max-w-[400px] min-w-[200px] h-96 flex flex-col"
        initial={{ y: 64, opacity: 0.3 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
      >
        <h3 className="text-2xl mb-1 font-bold">{props.title}</h3>
        <Link
          href={props.game_url}
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
                src={props.thumbnail}
                alt={`The thumbnail of the game ${props.title}`}
                fill
                className="object-cover"
                sizes="36"
              />
            </motion.div>
          </div>
        </Link>
        <div className="mt-1 flex flex-col items-start gap-1">
          <span className="text-purple-600 font-bold text-sm">
            {props.developer}
          </span>
          <p className="text-xs text-gray-400">{props.short_description}</p>
          <div className="w-full flex justify-between">
            <Heart
              size={24}
              className="cursor-pointer text-red-700"
              weight={props.isFavorite ? "fill" : "regular"}
              onClick={props.onFavoriteClick}
            />
            <StarRater value={props.rating} setValue={props.onRatingClick} />
          </div>
          <span className="bg-rose-600 text-sm text-rose-100 flex-0 px-1 rounded font-bold">
            {props.genre}
          </span>
          <div className="flex flex-row w-full justify-between">
            <span className="text-xs">Platform: {props.platform}</span>
            <span className="text-xs text-gray-300">
              Release: {props.release_date}
            </span>
          </div>
          <Link
            href={props.freetogame_profile_url}
            target="_blank"
            className="text-blue-500 text-sm font-bold underline"
          >
            Open freetogame
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
