import { useState } from "react";
import type { Game, GamesMap } from "@/types/game";

export const useGames = () => {
  const [liveGames, setLiveGames] = useState<GamesMap>({});
  const [finishedGames, setFinishedGames] = useState<GamesMap>({});

  const startGame = (homeName: string, awayName: string) => {
    const id = Date.now();
    const newGame: Game = {
      homeName,
      awayName,
      homeScore: 0,
      awayScore: 0,
    };

    setLiveGames((prev) => ({ ...prev, [id]: newGame }));
  };

  const finishGame = (id: string) => {
    const gameToMove = liveGames[id];
    if (!gameToMove) return;

    setLiveGames((prevLive) => {
      const { [id]: _, ...rest } = prevLive;
      return rest;
    });

    setFinishedGames((prevFinished) => ({
      ...prevFinished,
      [id]: gameToMove,
    }));
  };

  const updateScore = (id: string, homeScore: number, awayScore: number) => {
    setLiveGames((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        homeScore,
        awayScore,
      },
    }));
  };

  return { liveGames, finishedGames, startGame, finishGame, updateScore };
};
