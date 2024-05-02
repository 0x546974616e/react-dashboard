import { ReactNode } from "react";

export function ChartGroup(
    { children }: {
      children?: ReactNode,
    }
  ): JSX.Element
{
  return (
    <g>{children}</g>
  );
}
