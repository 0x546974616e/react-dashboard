import { ReactNode } from "react";

export interface ChartGroupProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
  >
{
  // Nothing so far.
}

export function ChartGroup(
    { children }: ChartGroupProps
  ): JSX.Element
{
  return (
    <g>{children}</g>
  );
}
