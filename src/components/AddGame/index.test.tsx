import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { AddGame } from "./index";

const onAdd = vi.fn();

describe("AddGame", () => {
  it("disables the button if either input is empty", () => {
    render(<AddGame onAdd={onAdd} />);

    const button = screen.getByRole("button", { name: /add game/i });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Team A" },
    });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Team B" },
    });
    expect(button).not.toBeDisabled();
  });

  it("calls onAdd when button is clicked and clears inputs after adding a game", () => {
    render(<AddGame onAdd={onAdd} />);

    const homeInput = screen.getByLabelText(/home team/i) as HTMLInputElement;
    const awayInput = screen.getByLabelText(/away team/i) as HTMLInputElement;

    fireEvent.change(homeInput, { target: { value: "Team A" } });
    fireEvent.change(awayInput, { target: { value: "Team B" } });

    const button = screen.getByRole("button", { name: /add game/i });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith("Team A", "Team B");

    expect(homeInput.value).toBe("");
    expect(awayInput.value).toBe("");
    expect(button).toBeDisabled();
  });
});
