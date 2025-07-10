import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { AddGame } from "./index";

const onAdd = vi.fn();

describe("AddGame", () => {
  it("disables the button if either input is empty", async () => {
    const user = userEvent.setup();
    render(<AddGame onAdd={onAdd} />);

    const button = screen.getByRole("button", { name: /add game/i });
    expect(button).toBeDisabled();

    await user.type(screen.getByLabelText(/home team/i), "Team A");
    expect(button).toBeDisabled();

    await user.type(screen.getByLabelText(/away team/i), "Team B");
    expect(button).not.toBeDisabled();
  });

  it("calls onAdd when button is clicked and clears inputs after adding a game", async () => {
    const user = userEvent.setup();
    render(<AddGame onAdd={onAdd} />);

    const homeInput = screen.getByLabelText(/home team/i) as HTMLInputElement;
    const awayInput = screen.getByLabelText(/away team/i) as HTMLInputElement;

    await user.type(homeInput, "Team A");
    await user.type(awayInput, "Team B");

    const button = screen.getByRole("button", { name: /add game/i });
    await user.click(button);

    expect(onAdd).toHaveBeenCalledWith("Team A", "Team B");

    expect(homeInput.value).toBe("");
    expect(awayInput.value).toBe("");
    expect(button).toBeDisabled();
  });
});
