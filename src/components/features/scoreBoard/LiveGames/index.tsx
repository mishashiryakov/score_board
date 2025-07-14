import { useState } from "react";
import { AddGame } from "@/components/features/scoreBoard/AddGame";
import { Divider } from "@/components/ui/Divider";
import { GameCard } from "@/components/features/scoreBoard/GameCard";
import { Modal } from "@/components/ui/Modal";
import { EditGame } from "@/components/features/scoreBoard/EditGame";
import type {
  Game,
  StartGameFn,
  FinishGameFn,
  UpdateGameFn,
} from "@/types/game";

type Props = {
  gamesList: Game[];
  startGame: StartGameFn;
  finishGame: FinishGameFn;
  updateScore: UpdateGameFn;
};

export const LiveGames = ({
  gamesList,
  startGame,
  finishGame,
  updateScore,
}: Props) => {
  const [editGame, setEditGame] = useState<(Game & { index: number }) | null>(
    null
  );

  const onModalClose = () => setEditGame(null);

  const onScoreUpdate: UpdateGameFn = (index, homeScore, awayScore) => {
    updateScore(index, homeScore, awayScore);
    onModalClose();
  };

  return (
    <div className="flex flex-col gap-7">
      {gamesList.length ? (
        gamesList.map((game, index) => (
          <GameCard
            key={game.id}
            id={game.id}
            homeName={game.homeName}
            awayName={game.awayName}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            onFinish={() => finishGame(index)}
            onEdit={() => setEditGame({ ...game, index })}
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
            homeTeamName={editGame.homeName}
            awayTeamName={editGame.awayName}
            currentHomeScore={editGame.homeScore}
            currentAwayScore={editGame.awayScore}
            onSave={onScoreUpdate}
            index={editGame.index}
          />
        )}
      </Modal>
    </div>
  );
};
