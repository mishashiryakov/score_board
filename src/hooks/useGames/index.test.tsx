import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGames } from "./index";

describe("useGames", () => {
  it("adds a new game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.addGame("Spain", "Italy");
    });

    expect(result.current.liveGames.length).toBe(1);
    expect(result.current.liveGames[0]).toMatchObject({
      homeName: "Spain",
      awayName: "Italy",
      homeScore: 0,
      awayScore: 0,
    });
  });

  it("updates score", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.addGame("Germany", "France");
    });

    const id = result.current.liveGames[0].id;

    act(() => {
      result.current.updateScore(id, 2, 3);
    });

    expect(result.current.liveGames[0].homeScore).toBe(2);
    expect(result.current.liveGames[0].awayScore).toBe(3);
  });

  it("finishes a game", () => {
    const { result } = renderHook(() => useGames());

    act(() => {
      result.current.addGame("England", "Portugal");
    });

    const id = result.current.liveGames[0].id;

    act(() => {
      result.current.finishGame(id);
    });

    expect(result.current.liveGames.length).toBe(0);
  });
});
