import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LiveGames } from "./index";
describe("LiveGames", () => {
  it("shows placeholder when gamesList is empty", () => {
    render(<LiveGames gamesList={[]} />);

    expect(
      screen.getByRole("heading", { name: /no live games at the moment/i })
    ).toBeInTheDocument();
  });

  it("adds new game and displays GameCard", () => {
    render(<LiveGames gamesList={[]} />);

    const homeInput = screen.getByLabelText(/home team/i);
    const awayInput = screen.getByLabelText(/away team/i);
    const button = screen.getByRole("button", { name: /add game/i });

    fireEvent.change(homeInput, { target: { value: "Spain" } });
    fireEvent.change(awayInput, { target: { value: "Italy" } });
    fireEvent.click(button);

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Italy")).toBeInTheDocument();
    expect(screen.getByText("0 : 0")).toBeInTheDocument();
  });
});
