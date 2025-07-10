import { memo } from "react";
import { type Game } from "@/types/game";

export const GameCard = memo(
  ({ homeName, awayName, homeScore, awayScore }: Game) => {
    return (
      <div className="grid grid-cols-3 items-center bg-gradient-to-r from-red-500 via-pink-500 to-pink-700 text-white font-bold text-2xl p-4 rounded-lg shadow-lg text-center">
        <h3 className="truncate">{homeName}</h3>
        <p>
          {homeScore} : {awayScore}
        </p>
        <h3 className="truncate">{awayName}</h3>
      </div>
    );
  }
);
