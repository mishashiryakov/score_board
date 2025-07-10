export type Game = {
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
};

export type FinishedGame = Game & {
  id: string;
  finishedAt: number;
};

export type GamesMap = Record<string, Game>;
