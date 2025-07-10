import { AddGame } from "@/components/AddGame";
import { Divider } from "@/components/Divider";
import { GameCard } from "@/components/GameCard";
import { Modal } from "@/components/Modal";
import { type GamesMap } from "@/types/game";
import { useState } from "react";

type Props = {
  gamesList: GamesMap;
  startGame: (homeName: string, awayName: string) => void;
  finishGame: (id: string) => void;
  updateScore: (id: string, homeScore: number, awayScore: number) => void;
};

export const LiveGames = ({
  gamesList,
  startGame,
  finishGame,
  updateScore,
}: Props) => {
  const [editGameId, setEditGameId] = useState<string>("");
  const gamesArray = Object.entries(gamesList);

  return (
    <div className="flex flex-col gap-5">
      {gamesArray.length ? (
        gamesArray.map(([id, game]) => (
          <GameCard
            key={id}
            homeName={game.homeName}
            awayName={game.awayName}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            onFinish={() => finishGame(id)}
            onEdit={() => setEditGameId(id)}
          />
        ))
      ) : (
        <h2 className="text-xl font-bold text-gray-800">
          No Live games at the moment
        </h2>
      )}
      <Divider />
      <AddGame onAdd={startGame} />
      <Modal isOpen={Boolean(editGameId)} onClose={() => setEditGameId("")}>
        <AddGame onAdd={startGame} />
      </Modal>
      {/* Edit + Finish */}
    </div>
  );
};
