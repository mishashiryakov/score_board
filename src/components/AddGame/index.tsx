import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const AddGame = () => {
  const [homeName, setHomeName] = useState<string>("");
  const [awayName, setAwayName] = useState<string>("");

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
      <Button onClick={() => {}}>Add Game</Button>
    </div>
  );
};
