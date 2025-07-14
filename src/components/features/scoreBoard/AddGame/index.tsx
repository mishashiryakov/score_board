import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  onAdd: (homeName: string, awayName: string) => void;
};

export const AddGame = ({ onAdd }: Props) => {
  const [homeName, setHomeName] = useState<string>("");
  const [awayName, setAwayName] = useState<string>("");

  const addGame = () => {
    onAdd(homeName, awayName);
    setHomeName("");
    setAwayName("");
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-xl font-bold text-gray-800">Add new game</h2>
      <div className="flex gap-4">
        <Input
          label="Home team"
          value={homeName}
          setValue={setHomeName}
          className="flex-1"
        />
        <Input
          label="Away team"
          value={awayName}
          setValue={setAwayName}
          className="flex-1"
        />
      </div>
      <Button onClick={addGame} disabled={!homeName || !awayName}>
        Add Game
      </Button>
    </div>
  );
};
