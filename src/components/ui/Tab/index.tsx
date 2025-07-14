import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const Tab = ({ isActive, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={twMerge("cursor-pointer font-medium", isActive && "overline")}
    >
      {children}
    </button>
  );
};
