import { ReactNode } from "react";

export interface ChartGroupProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
    | "className"
  >
{
  name?: string,
}

export function ChartGroup(
    { children,
      className,
      name,
    }: ChartGroupProps
  ): JSX.Element
{
  return (
    <g
      data-name={name}
      className={className}
    >
      {children}
    </g>
  );
}
