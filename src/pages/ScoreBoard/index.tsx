import { useState } from "react";
import { Tab } from "@/components/ui/Tab";
import { TabList } from "@/components/ui/TabList";
import { LiveGames } from "@/components/features/scoreBoard/LiveGames";
import { GamesSummary } from "@/components/features/scoreBoard/GamesSummary";
import { Divider } from "@/components/ui/Divider";
import { useGames } from "@/hooks/useGames";

enum Views {
  Live = "Live",
  Summary = "Summary",
}

const tabs = [
  { id: Views.Live, label: "Live Score Board" },
  { id: Views.Summary, label: "Games Summary" },
];

export const ScoreBoard = () => {
  const [activeView, setActiveView] = useState<Views>(Views.Live);

  const { liveGames, finishedGames, startGame, finishGame, updateScore } =
    useGames();

  return (
    <div className="flex flex-col gap-5 bg-white/30 border border-white/30 rounded-xl shadow-lg p-10 w-full">
      <TabList>
        {tabs.map(({ id, label }) => (
          <Tab
            key={id}
            isActive={activeView === id}
            onClick={() => setActiveView(id)}
          >
            {label}
          </Tab>
        ))}
      </TabList>

      <Divider />

      {activeView === Views.Live && (
        <LiveGames
          gamesList={liveGames}
          startGame={startGame}
          finishGame={finishGame}
          updateScore={updateScore}
        />
      )}
      {activeView === Views.Summary && (
        <GamesSummary finishedGames={finishedGames} />
      )}
    </div>
  );
};
