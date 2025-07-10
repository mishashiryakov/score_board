import { memo } from "react";
import { type Game } from "@/types/game";

type GameCardProps = Game & {
  onClose: () => void;
  onEdit: () => void;
};

export const GameCard = memo(
  ({
    homeName,
    awayName,
    homeScore,
    awayScore,
    onClose,
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
          onClick={() => {}}
        >
          ✕
        </button>
        <button
          className="absolute bottom-1 right-2 text-white cursor-pointer font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => {}}
        >
          Edit
        </button>
      </div>
    );
  }
);
