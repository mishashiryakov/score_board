import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LiveGames } from "./index";
import { type GamesMap } from "@/types/game";

const onAdd = vi.fn();

describe("LiveGames", () => {
  it("shows placeholder when gamesList is empty", () => {
    render(<LiveGames gamesList={{}} startGame={onAdd} />);

    expect(
      screen.getByRole("heading", { name: /no live games at the moment/i })
    ).toBeInTheDocument();
  });

  it("renders a list of games", () => {
    const mockGames: GamesMap = {
      "1": {
        homeName: "Spain",
        awayName: "Italy",
        homeScore: 2,
        awayScore: 1,
      },
      "2": {
        homeName: "Germany",
        awayName: "France",
        homeScore: 0,
        awayScore: 0,
      },
    };

    render(<LiveGames gamesList={mockGames} startGame={onAdd} />);

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Italy")).toBeInTheDocument();
    expect(screen.getByText("2 : 1")).toBeInTheDocument();

    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("0 : 0")).toBeInTheDocument();
  });
});
