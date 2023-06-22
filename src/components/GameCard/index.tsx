import Image from "next/image";
import Link from "next/link";

import { Game } from "@/app/model/Game";

type GameCardProps = Game;
export function GameCard({
  title,
  thumbnail,
  game_url,
  developer,
  freetogame_profile_url,
  genre,
  platform,
  publisher,
  release_date,
  short_description,
}: GameCardProps) {
  return (
    <Link href={game_url} target="_blank">
      <div className="max-w-[400px] min-w-[200px] h-96 flex flex-col">
        <h3 className="text-2xl mb-1">{title}</h3>
        <div className="relative flex-1 overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={`The thumbnail of the game ${title}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-1">
          <span className="text-blue-600">{publisher}</span>
          <p className="text-xs">{short_description}</p>
          <span className="text-rose-600 text-sm">{genre}</span>
          <div className="flex flex-row justify-between">
            <span>{developer}</span>
            <span className="text-xs">{release_date}</span>
          </div>
          <span>Platform: {platform}</span>
        </div>
      </div>
    </Link>
  );
}
