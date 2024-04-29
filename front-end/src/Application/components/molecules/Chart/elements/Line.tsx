import { memo } from "react";
import { ChartContext } from "../ChartContext";

export interface LineProps extends
  Pick<JSX.IntrinsicElements["line"],
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export const Line = memo(_Line);

function _Line(
    { x1, y1,
      x2, y2,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: LineProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <line
          x1={nw(x1)}
          y1={nh(y1)}
          x2={nw(x2)}
          y2={nh(y2)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
        />
      )}
    </ChartContext.Consumer>
  );
}
