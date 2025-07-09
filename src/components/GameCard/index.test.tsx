import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GameCard } from "./index";

describe("GameCard", () => {
  it("displays team names and score", () => {
    render(
      <GameCard
        homeName="Team A"
        awayName="Team B"
        homeScore={1}
        awayScore={0}
      />
    );

    expect(screen.getByRole("heading", { name: "Team A" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Team B" })).toBeInTheDocument();
    expect(screen.getByText("1 : 0")).toBeInTheDocument();
  });
});
