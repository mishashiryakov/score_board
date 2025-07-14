import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGames } from "./index";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useGames", () => {
  it("adds a new game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("Spain", "Italy");
    });

    const liveGamesArray = result.current.liveGames;

    expect(liveGamesArray.length).toBe(1);
    expect(liveGamesArray[0]).toMatchObject({
      homeName: "Spain",
      awayName: "Italy",
      homeScore: 0,
      awayScore: 0,
    });
  });

  it("updates score", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("Germany", "France");
    });

    act(() => {
      result.current.updateScore(0, 2, 3);
    });

    expect(result.current.liveGames[0].homeScore).toBe(2);
    expect(result.current.liveGames[0].awayScore).toBe(3);
  });

  it("finishes a game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("England", "Portugal");
    });

    const id = result.current.liveGames[0].id;

    act(() => {
      result.current.finishGame(0);
    });

    expect(result.current.liveGames[0]).toBeUndefined();
    expect(Object.keys(result.current.liveGames)).toHaveLength(0);

    const finishedGame = result.current.finishedGames.find((g) => g.id === id);
    expect(finishedGame).toBeDefined();
    expect(finishedGame?.homeName).toBe("England");
    expect(finishedGame?.awayName).toBe("Portugal");
    expect(typeof finishedGame?.finishedAt).toBe("number");
  });

  it("does not change liveGames or finishedGames if id doesn't exist", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("Brazil", "Argentina");
    });

    const initialLiveGames = [...result.current.liveGames];
    const initialFinishedGames = [...result.current.finishedGames];

    act(() => {
      result.current.finishGame(5);
    });

    expect(result.current.liveGames).toEqual(initialLiveGames);
    expect(result.current.finishedGames).toEqual(initialFinishedGames);
  });

  it("sorts finished games by total score and finish time", async () => {
    const { result } = renderHook(() => useGames());

    const games = [
      ["Mexico", "Canada"],
      ["Spain", "Brazil"],
      ["Germany", "France"],
      ["Uruguay", "Italy"],
      ["Argentina", "Australia"],
    ];

    act(() => {
      games.forEach(([home, away]) => result.current.startGame(home, away));
    });

    const scores = [
      [0, 5], // Mexico - Canada
      [10, 2], // Spain - Brazil
      [2, 2], // Germany - France
      [6, 6], // Uruguay - Italy
      [3, 1], // Argentina - Australia
    ];

    act(() => {
      scores.forEach(([homeScore, awayScore], i) => {
        result.current.updateScore(i, homeScore, awayScore);
      });
    });

    const finishByTeams = async (home: string, away: string) => {
      const index = result.current.liveGames.findIndex(
        (g) => g.homeName === home && g.awayName === away
      );
      act(() => result.current.finishGame(index));
      await wait(10);
    };

    const finishOrder = [
      ["Uruguay", "Italy"],
      ["Spain", "Brazil"],
      ["Mexico", "Canada"],
      ["Argentina", "Australia"],
      ["Germany", "France"],
    ];

    for (const [home, away] of finishOrder) {
      await finishByTeams(home, away);
    }

    const summary = result.current.finishedGames;

    const gameDescriptions = summary.map(
      (g) => `${g.homeName} ${g.homeScore} - ${g.awayScore} ${g.awayName}`
    );

    expect(gameDescriptions).toEqual([
      "Spain 10 - 2 Brazil",
      "Uruguay 6 - 6 Italy",
      "Mexico 0 - 5 Canada",
      "Germany 2 - 2 France",
      "Argentina 3 - 1 Australia",
    ]);
  });
});
