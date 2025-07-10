import { memo } from "react";
import { type Game } from "@/types/game";

type BaseGameCardProps = Game & {
  viewMode?: false;
  onFinish: () => void;
  onEdit: () => void;
};

type ViewOnlyGameCardProps = Game & {
  viewMode: true;
  onFinish?: never;
  onEdit?: never;
};

type GameCardProps = BaseGameCardProps | ViewOnlyGameCardProps;

export const GameCard = memo(
  ({
    homeName,
    awayName,
    homeScore,
    awayScore,
    onFinish,
    onEdit,
    viewMode,
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
        {!viewMode && (
          <>
            <button
              className="absolute top-1 right-2 text-white cursor-pointer font-black"
              onClick={onFinish}
            >
              ✕
            </button>
            <button
              className="absolute bottom-1 right-2 text-white cursor-pointer font-medium"
              onClick={onEdit}
            >
              Edit
            </button>
          </>
        )}
      </div>
    );
  }
);
