import { ChartRect } from "Application/components/atoms";
import { ChartContext } from "Application/contexts";
import { Position2 } from "Application/types";

export interface KpiHistogramBarProps {
  histogram1: Position2[],
  histogram2: Position2[] | null,
}

export function KpiHistogramBar(
    { histogram1,
      histogram2,
    }: KpiHistogramBarProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny, nw, nh, iw, ih }) => (
        <g className={"kpi-chart-histogram-bar"}>
          <g className={"kpi-chart-histogram-bar-1"}>
            {histogram1.map(
              ([ x, y ], index, histogram) => {
                if (index <= 0 || histogram.length <= 0) {
                  return null;
                }

                const [ bx, by ] = histogram[0]!;
                const [ cx, cy ] = histogram[index - 1]!;

                // if (y < by)

                return (
                  <ChartRect
                    key={index}
                    x={cx}
                    y={by}
                    // y={cy}
                    w={x - cx}
                    h={y - by}
                    // h={y - cy}
                    fill="red"
                    stroke="black"
                  />
                );
              }
            )}
          </g>

          <g className={"kpi-chart-histogram-bar-2"}>
            {histogram2?.map(
              () => null
            )}
          </g>
        </g>
      )}
    </ChartContext.Consumer>
  );
}