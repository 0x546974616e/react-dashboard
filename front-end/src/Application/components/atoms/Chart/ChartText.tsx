import { memo, useCallback } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartTextProps extends
  Pick<JSX.IntrinsicElements["text"],
    | "children"
    | "fill"
    | "textAnchor"
    | "dominantBaseline"
    | "alignmentBaseline"
  >
{
  x: number,
  y: number,

  onLayout?(rect: DOMRect): void,
}

export const ChartText = memo(_ChartText);

function _ChartText(
    { x, y,
      onLayout,
      children,
      fill,
      textAnchor,
      dominantBaseline,
      alignmentBaseline,
    }: ChartTextProps
  ): JSX.Element
{
  const ref = useCallback(
    (element: SVGTextElement | null) => {
      if (element && onLayout) {
        onLayout(element.getBBox())
      }
    }, []
  );

  return (
    <ChartContext.Consumer>
      {({ nx, ny }) => (
        <text
          ref={ref}
          x={nx(x)}
          y={ny(y)}
          fill={fill}
          textAnchor={textAnchor}
          alignmentBaseline={alignmentBaseline}
          dominantBaseline={dominantBaseline}
        >
          {children}
        </text>
      )}
    </ChartContext.Consumer>
  );
}
