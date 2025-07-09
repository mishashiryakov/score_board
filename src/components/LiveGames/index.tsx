import { AddGame } from "@/components/AddGame";
import { Divider } from "@/components/Divider";

export const LiveGames = () => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-gray-800">
        No Live games at the moment
      </h2>
      <Divider />
      <AddGame onAdd={() => {}} />
      {/* data work flow */}
      {/* games list + Edit + Finish */}
      {/* Add game */}
    </div>
  );
};
