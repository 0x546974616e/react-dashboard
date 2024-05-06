import { ReactNode } from "react";

export interface ChartGroupProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
    | "className"
  >
{
  // Nothing so far.
}

export function ChartGroup(
    { children,
      className,
    }: ChartGroupProps
  ): JSX.Element
{
  return (
    <g className={className}>
      {children}
    </g>
  );
}
