import { useState } from "react";
import { type Game } from "@/types/game";

export const useGames = () => {
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [finishedGames, setFinishedGames] = useState<Game[]>([]);

  const addGame = () => {};

  const finishGame = () => {};

  const updateScore = () => {};

  return { liveGames, finishedGames, addGame, finishGame, updateScore };
};
