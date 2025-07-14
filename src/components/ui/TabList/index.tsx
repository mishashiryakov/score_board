import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TabList = ({ children }: Props) => {
  return <div className="flex gap-20 justify-center">{children}</div>;
};
