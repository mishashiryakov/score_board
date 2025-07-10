import { useState } from "react";
import type { Game, GamesMap, FinishedGame } from "@/types/game";

let nextGameId = 0;

export const useGames = () => {
  const [liveGames, setLiveGames] = useState<GamesMap>({});
  const [finishedGames, setFinishedGames] = useState<FinishedGame[]>([]);

  const startGame = (homeName: string, awayName: string) => {
    // For simplicity
    const id = (nextGameId++).toString();

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

    const finishedGame: FinishedGame = {
      ...gameToMove,
      id,
      finishedAt: Date.now(),
    };

    setFinishedGames((prevFinished) => {
      const updated = [...prevFinished, finishedGame];
      return updated.sort((a, b) => {
        const totalA = a.homeScore + a.awayScore;
        const totalB = b.homeScore + b.awayScore;

        if (totalB !== totalA) return totalB - totalA;
        return b.finishedAt - a.finishedAt;
      });
    });
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
