import { type FinishedGame } from "@/types/game";
import { GameCard } from "@/components/GameCard";

type Props = {
  finishedGames: FinishedGame[];
};

export const GamesSummary = ({ finishedGames }: Props) => {
  return (
    <div className="flex flex-col gap-7">
      {finishedGames.map((game) => (
        <GameCard
          key={game.id}
          homeName={game.homeName}
          awayName={game.awayName}
          homeScore={game.homeScore}
          awayScore={game.awayScore}
          onFinish={() => {}}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
};
