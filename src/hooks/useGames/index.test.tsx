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
    expect(result.current.finishedGames[id]).toBeDefined();
  });

  it("does not change liveGames or finishedGames if id doesn't exist", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.startGame("Brazil", "Argentina");
    });

    const initialLiveGames = { ...result.current.liveGames };
    const initialFinishedGames = { ...result.current.finishedGames };

    act(() => {
      result.current.finishGame("non-existing-id");
    });

    expect(result.current.liveGames).toEqual(initialLiveGames);
    expect(result.current.finishedGames).toEqual(initialFinishedGames);
  });
});
