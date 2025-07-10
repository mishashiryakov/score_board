import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGames } from "./index";

describe("useGames", () => {
  it("adds a new game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("Spain", "Italy");
    });

    const liveGamesArray = Object.values(result.current.liveGames);

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

    const id = Object.keys(result.current.liveGames)[0];

    act(() => {
      result.current.updateScore(id, 2, 3);
    });

    expect(result.current.liveGames[id].homeScore).toBe(2);
    expect(result.current.liveGames[id].awayScore).toBe(3);
  });

  it("finishes a game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("England", "Portugal");
    });

    const id = Object.keys(result.current.liveGames)[0];

    act(() => {
      result.current.finishGame(id);
    });

    expect(result.current.liveGames[id]).toBeUndefined();
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

    const initialLiveGames = { ...result.current.liveGames };
    const initialFinishedGames = [...result.current.finishedGames];

    act(() => {
      result.current.finishGame("non-existing-id");
    });

    expect(result.current.liveGames).toEqual(initialLiveGames);
    expect(result.current.finishedGames).toEqual(initialFinishedGames);
  });

  it("sorts finished games by total score and finish time", () => {
    const { result } = renderHook(() => useGames());

    const games = [
      ["Mexico", "Canada"],
      ["Spain", "Brazil"],
      ["Germany", "France"],
      ["Uruguay", "Italy"],
      ["Argentina", "Australia"],
    ];

    const ids: Record<string, string> = {};
    act(() => {
      games.forEach(([home, away]) => [result.current.startGame(home, away)]);
    });

    const liveGames = result.current.liveGames;

    Object.entries(liveGames).forEach(([id, game]) => {
      ids[`${game.homeName}-${game.awayName}`] = id;
    });

    act(() => {
      result.current.updateScore(ids["Mexico-Canada"], 0, 5);
      result.current.updateScore(ids["Spain-Brazil"], 10, 2);
      result.current.updateScore(ids["Germany-France"], 2, 2);
      result.current.updateScore(ids["Uruguay-Italy"], 6, 6);
      result.current.updateScore(ids["Argentina-Australia"], 3, 1);
    });

    act(() => {
      result.current.finishGame(ids["Uruguay-Italy"]);
    });
    act(() => {
      result.current.finishGame(ids["Spain-Brazil"]);
    });
    act(() => {
      result.current.finishGame(ids["Mexico-Canada"]);
    });
    act(() => {
      result.current.finishGame(ids["Argentina-Australia"]);
    });
    act(() => {
      result.current.finishGame(ids["Germany-France"]);
    });

    const summary = result.current.finishedGames;

    const gameDescriptions = summary.map(
      (g) => `${g.homeName} ${g.homeScore} - ${g.awayScore} ${g.awayName}`
    );

    expect(gameDescriptions).toEqual([
      "Uruguay 6 - 6 Italy",
      "Spain 10 - 2 Brazil",
      "Mexico 0 - 5 Canada",
      "Argentina 3 - 1 Australia",
      "Germany 2 - 2 France",
    ]);
  });
});
