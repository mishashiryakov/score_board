import { useState } from "react";
import { Tab } from "@/components/Tab";
import { TabList } from "@/components/TabList";
import { LiveGames } from "@/components/LiveGames";
import { GamesSummary } from "@/components/GamesSummary";

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

      <div className="h-[1px] w-full bg-gray-200" />

      {activeView === Views.Live && <LiveGames />}
      {activeView === Views.Summary && <GamesSummary />}
    </div>
  );
};
