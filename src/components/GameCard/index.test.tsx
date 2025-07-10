import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { GameCard } from "./index";

describe("GameCard", () => {
  it("displays team names and score", () => {
    render(
      <GameCard
        homeName="Team A"
        awayName="Team B"
        homeScore={1}
        awayScore={0}
        onFinish={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByRole("heading", { name: "Team A" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Team B" })).toBeInTheDocument();
    expect(screen.getByText("1 : 0")).toBeInTheDocument();
  });

  it("calls onClose when ✕ button is clicked", async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(
      <GameCard
        homeName="Team A"
        awayName="Team B"
        homeScore={1}
        awayScore={0}
        onFinish={onFinish}
        onEdit={() => {}}
      />
    );

    const closeButton = screen.getByRole("button", { name: "✕" });
    await user.click(closeButton);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("calls onEdit when Edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <GameCard
        homeName="Team A"
        awayName="Team B"
        homeScore={1}
        awayScore={0}
        onFinish={() => {}}
        onEdit={onEdit}
      />
    );

    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("does not render buttons when in viewMode", () => {
    render(
      <GameCard
        homeName="Team A"
        awayName="Team B"
        homeScore={2}
        awayScore={2}
        viewMode={true}
      />
    );

    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Edit" })
    ).not.toBeInTheDocument();
  });
});
