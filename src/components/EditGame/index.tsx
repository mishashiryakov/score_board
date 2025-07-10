import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  id: string;
  currentHomeScore: number;
  currentAwayScore: number;
  onSave: (id: string, homeScore: number, awayScore: number) => void;
};

export const EditGame = ({
  id,
  currentHomeScore,
  currentAwayScore,
  onSave,
}: Props) => {
  const [homeScore, setHomeScore] = useState<number>(currentHomeScore);
  const [awayScore, setAwayScore] = useState<number>(currentAwayScore);

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-xl font-bold text-gray-800">Add new game</h2>
      <div className="flex gap-4">
        <Input
          label="Home team"
          value={homeScore}
          setValue={setHomeScore}
          className="flex-1"
          type="number"
        />
        <Input
          label="Away team"
          value={awayScore}
          setValue={setAwayScore}
          className="flex-1"
          type="number"
        />
      </div>
      <Button
        onClick={() => onSave(id, homeScore, awayScore)}
        disabled={!homeScore || !awayScore}
      >
        Save Changes
      </Button>
    </div>
  );
};
