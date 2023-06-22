import Image from "next/image";

import { Game } from "@/app/model/Game";

type GameCardProps = Game;
export function GameCard({ title, thumbnail }: GameCardProps) {
  return (
    <div className="max-w-[400px] min-w-[200px] h-64 flex flex-col">
      <div className="relative w-full flex-1">
        <Image
          src={thumbnail}
          alt={`The thumbnail of the game ${title}`}
          fill
          className="object-contain"
        />
      </div>
      <h3>{title}</h3>
    </div>
  );
}
