import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  id: string;
  homeTeamName: string;
  awayTeamName: string;
  currentHomeScore: number;
  currentAwayScore: number;
  onSave: (id: string, homeScore: number, awayScore: number) => void;
};

export const EditGame = ({
  id,
  homeTeamName,
  awayTeamName,
  currentHomeScore,
  currentAwayScore,
  onSave,
}: Props) => {
  const [homeScore, setHomeScore] = useState<number>(currentHomeScore);
  const [awayScore, setAwayScore] = useState<number>(currentAwayScore);

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-xl font-bold text-gray-800">Edit Game Score</h2>
      <div className="flex gap-4">
        <Input
          label={homeTeamName}
          value={homeScore.toString()}
          setValue={(val) => setHomeScore(Number(val))}
          className="flex-1"
          type="number"
        />
        <Input
          label={awayTeamName}
          value={awayScore.toString()}
          setValue={(val) => setAwayScore(Number(val))}
          className="flex-1"
          type="number"
        />
      </div>
      <Button
        onClick={() => onSave(id, homeScore, awayScore)}
        disabled={
          homeScore < 0 ||
          awayScore < 0 ||
          (homeScore === currentHomeScore && awayScore === currentAwayScore)
        }
      >
        Save Changes
      </Button>
    </div>
  );
};
