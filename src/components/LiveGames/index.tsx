import { useState } from "react";
import { AddGame } from "@/components/AddGame";
import { Divider } from "@/components/Divider";
import { GameCard } from "@/components/GameCard";
import { Modal } from "@/components/Modal";
import { EditGame } from "@/components/EditGame";
import type { GamesMap, Game } from "@/types/game";

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
  const [editGame, setEditGame] = useState<(Game & { id: string }) | null>(
    null
  );
  const gamesArray = Object.entries(gamesList);

  const onModalClose = () => setEditGame(null);

  const onScoreUpdate = (id: string, homeScore: number, awayScore: number) => {
    updateScore(id, homeScore, awayScore);
    onModalClose();
  };

  return (
    <div className="flex flex-col gap-7">
      {gamesArray.length ? (
        gamesArray.map(([id, game]) => (
          <GameCard
            key={id}
            homeName={game.homeName}
            awayName={game.awayName}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            onFinish={() => finishGame(id)}
            onEdit={() => setEditGame({ ...game, id })}
          />
        ))
      ) : (
        <h2 className="text-3xl font-bold text-gray-800">
          No Live games at the moment
        </h2>
      )}
      <Divider />
      <AddGame onAdd={startGame} />
      <Modal isOpen={Boolean(editGame)} onClose={onModalClose}>
        {editGame && (
          <EditGame
            id={editGame.id}
            homeTeamName={editGame.homeName}
            awayTeamName={editGame.awayName}
            currentHomeScore={editGame.homeScore}
            currentAwayScore={editGame.awayScore}
            onSave={onScoreUpdate}
          />
        )}
      </Modal>
    </div>
  );
};
