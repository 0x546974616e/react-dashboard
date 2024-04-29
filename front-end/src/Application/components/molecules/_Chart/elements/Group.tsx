import { ReactNode } from "react";

export function Group(
    { children }: {
      children?: ReactNode,
    }
  ): JSX.Element
{
  return (
    <g>{children}</g>
  );
}
