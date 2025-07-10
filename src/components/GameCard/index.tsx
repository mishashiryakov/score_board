import { memo } from "react";
import { type Game } from "@/types/game";

type GameCardProps = Game & {
  onFinish: () => void;
  onEdit: () => void;
};

// TODO add view mode
export const GameCard = memo(
  ({
    homeName,
    awayName,
    homeScore,
    awayScore,
    onFinish,
    onEdit,
  }: GameCardProps) => {
    return (
      <div className="relative group">
        <div className="grid grid-cols-3 items-center bg-gradient-to-r from-red-500 via-pink-500 to-pink-700 text-white font-bold text-2xl p-4 rounded-lg shadow-lg text-center">
          <h3 className="truncate">{homeName}</h3>
          <p>
            {homeScore} : {awayScore}
          </p>
          <h3 className="truncate pr-6">{awayName}</h3>
        </div>
        <button
          className="absolute top-1 right-2 text-white cursor-pointer font-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={onFinish}
        >
          ✕
        </button>
        <button
          className="absolute bottom-1 right-2 text-white cursor-pointer font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    );
  }
);
