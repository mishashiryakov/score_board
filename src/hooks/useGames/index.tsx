import { useState } from "react";
import type {
  Game,
  FinishedGame,
  StartGameFn,
  FinishGameFn,
  UpdateGameFn,
} from "@/types/game";

let nextGameId = 0;

export const useGames = () => {
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [finishedGames, setFinishedGames] = useState<FinishedGame[]>([]);

  const startGame: StartGameFn = (homeName, awayName) => {
    // For simplicity
    const id = (nextGameId++).toString();

    const newGame: Game = {
      id,
      homeName,
      awayName,
      homeScore: 0,
      awayScore: 0,
    };

    setLiveGames((prev) => [...prev, newGame]);
  };

  const finishGame: FinishGameFn = (index) => {
    const gameToMove = liveGames[index];
    if (!gameToMove) return;

    setLiveGames((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);

    const finishedGame: FinishedGame = {
      ...gameToMove,
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

  const updateScore: UpdateGameFn = (index, homeScore, awayScore) => {
    setLiveGames((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], homeScore, awayScore };
      return copy;
    });
  };

  return { liveGames, finishedGames, startGame, finishGame, updateScore };
};
