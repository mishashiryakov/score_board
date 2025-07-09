import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LiveGames } from "./index";
import { type Game } from "@/types/game";

describe("LiveGames", () => {
  it("shows placeholder when gamesList is empty", () => {
    render(<LiveGames gamesList={[]} />);

    expect(
      screen.getByRole("heading", { name: /no live games at the moment/i })
    ).toBeInTheDocument();
  });

  it("renders a list of games", () => {
    const mockGames: Game[] = [
      {
        homeName: "Spain",
        awayName: "Italy",
        homeScore: 2,
        awayScore: 1,
      },
      {
        homeName: "Germany",
        awayName: "France",
        homeScore: 0,
        awayScore: 0,
      },
    ];

    render(<LiveGames gamesList={mockGames} />);

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Italy")).toBeInTheDocument();
    expect(screen.getByText("2 : 1")).toBeInTheDocument();

    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("0 : 0")).toBeInTheDocument();
  });
});
