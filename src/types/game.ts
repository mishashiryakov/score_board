export type Game = {
  id: string;
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
};

export type FinishedGame = Game & {
  id: string;
  finishedAt: number;
};

export type StartGameFn = (homeName: string, awayName: string) => void;
export type FinishGameFn = (index: number) => void;
export type UpdateGameFn = (
  index: number,
  homeScore: number,
  awayScore: number
) => void;
