import { AddGame } from "@/components/AddGame";
import { Divider } from "@/components/Divider";
import { GameCard } from "@/components/GameCard";
import { type Game } from "@/types/game";

type Props = {
  gamesList: Game[];
};

export const LiveGames = ({ gamesList }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {gamesList.length ? (
        gamesList.map((game, index) => (
          <GameCard
            key={index}
            homeName={game.homeName}
            awayName={game.awayName}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
          />
        ))
      ) : (
        <h2 className="text-xl font-bold text-gray-800">
          No Live games at the moment
        </h2>
      )}
      <Divider />
      <AddGame onAdd={() => {}} />
      {/* data work flow */}
      {/* games list + Edit + Finish */}
      {/* Add game */}
    </div>
  );
};
