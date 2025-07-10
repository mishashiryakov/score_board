import { AddGame } from "@/components/AddGame";
import { Divider } from "@/components/Divider";
import { GameCard } from "@/components/GameCard";
import { Modal } from "@/components/Modal";
import { type GamesMap } from "@/types/game";
import { useState } from "react";

type Props = {
  gamesList: GamesMap;
  startGame: (homeName: string, awayName: string) => void;
};

export const LiveGames = ({ gamesList, startGame }: Props) => {
  const [isEditModalOpen, setIsModalOpen] = useState<boolean>(false);
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
          />
        ))
      ) : (
        <h2 className="text-xl font-bold text-gray-800">
          No Live games at the moment
        </h2>
      )}
      <Divider />
      <AddGame onAdd={startGame} />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddGame onAdd={startGame} />
      </Modal>
      {/* Edit + Finish */}
    </div>
  );
};
