import { memo } from "react";
import { ChartContext } from "Application/contexts";
import { ChartLine } from "Application/components/atoms";
import { ChartGridRuleTheme } from "Application/theme";

export interface ChartBaseLinesProps {
  baseLine1?: number,
  baseLine2?: number,

  strokeColor1?: string,
  strokeColor2?: string,

  strokeWidth1?: number,
  strokeWidth2?: number,
}

export const ChartBaseLines = memo(_ChartBaseLines);

function _ChartBaseLines(
    { baseLine1,
      baseLine2,

      strokeColor1,
      strokeColor2,

      strokeWidth1,
      strokeWidth2,
    }: ChartBaseLinesProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ x1, x2, iw }) => (
        <g className={"chart-baselines"}>
          {baseLine1 != undefined && (
            <ChartLine
              x1={x1 - iw(ChartGridRuleTheme.yLegendMarginRight / 2)}
              x2={x2}
              y1={baseLine1}
              y2={baseLine1}
              className={"chart-baseline-1"}
              strokeWidth={strokeWidth1}
              stroke={strokeColor1}
            />
          )}

          {baseLine2 && baseLine2 != baseLine1 && (
            <ChartLine
              x1={x1 - iw(ChartGridRuleTheme.yLegendMarginRight / 2)}
              x2={x2}
              y1={baseLine2}
              y2={baseLine2}
              className={"chart-baseline-2"}
              strokeWidth={strokeWidth2}
              stroke={strokeColor2}
            />
          )}
        </g>
      )}
    </ChartContext.Consumer>
  );
}
