import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EditGame } from "./index";

const defaultProps = {
  index: 0,
  currentHomeScore: 1,
  currentAwayScore: 2,
  homeTeamName: "Team A",
  awayTeamName: "Team B",
  onSave: vi.fn(),
};

describe("EditGame", () => {
  it("renders input labels with team names", () => {
    render(<EditGame {...defaultProps} />);
    expect(screen.getByLabelText(/team a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/team b/i)).toBeInTheDocument();
  });

  it("only calls onSave when score is changed", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(<EditGame {...defaultProps} onSave={onSave} />);

    const button = screen.getByRole("button", { name: /save changes/i });
    expect(button).toBeDisabled();

    const homeInput = screen.getByLabelText(/team a/i);
    await user.clear(homeInput);
    await user.type(homeInput, "5");

    expect(button).toBeEnabled();

    await user.click(button);

    expect(onSave).toHaveBeenCalledWith(0, 5, 2);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("allows changing number values in the inputs", async () => {
    const user = userEvent.setup();
    render(<EditGame {...defaultProps} />);

    const homeInput = screen.getByLabelText(/team a/i);
    const awayInput = screen.getByLabelText(/team b/i);

    await user.clear(homeInput);
    await user.type(homeInput, "5");

    await user.clear(awayInput);
    await user.type(awayInput, "7");

    expect((homeInput as HTMLInputElement).value).toBe("5");
    expect((awayInput as HTMLInputElement).value).toBe("7");
  });

  it("disables the button if any score is less than 0", async () => {
    const user = userEvent.setup();
    render(<EditGame {...defaultProps} />);

    const button = screen.getByRole("button", { name: /save changes/i });
    const homeInput = screen.getByLabelText(/team a/i);

    await user.clear(homeInput);
    await user.type(homeInput, "-1");

    expect(button).toBeDisabled();
  });
});
