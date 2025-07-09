import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export const Button = ({ onClick, disabled, children }: Props) => {
  return (
    <button
      className={twMerge(
        "bg-blue-500 text-white rounded-md w-fit cursor-pointer py-2 px-4",
        disabled && "bg-gray-400 "
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
