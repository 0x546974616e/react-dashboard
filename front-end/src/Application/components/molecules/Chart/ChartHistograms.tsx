import { ChartRect } from "Application/components/atoms";
import { ChartContext } from "Application/contexts";
import { ChartHistogramsTheme } from "Application/theme";
import { Position2 } from "Application/types";

export interface ChartHistogramsProps {
  histogram1: Position2[],
  histogram2: Position2[] | null,
}

const SCALE = 0.8;

export function ChartHistograms(
    { histogram1,
      histogram2,
    }: ChartHistogramsProps
  ): JSX.Element
{
  // const dada = (histogram2 ? 1 : 0) * iw(ChartHistogramsTheme.dada);

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

                return (
                  <ChartRect
                    key={index}
                    x={cx + iw(ChartHistogramsTheme.paddingHorizontal)}
                    y={by}
                    w={(x - cx) - iw(2 * ChartHistogramsTheme.paddingHorizontal)}
                    h={y - by}
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
