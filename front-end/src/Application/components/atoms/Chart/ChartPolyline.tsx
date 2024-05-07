import { memo, useMemo, useState } from "react";
import { useChartContext } from "Application/contexts";

export interface ChartPolylineProps extends
  Pick<JSX.IntrinsicElements["polyline"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "strokeDasharray"
    | "strokeDashoffset"
    | "className"
  >
{
  points: [x: number, y: number][],

  /**
   * Animates stroke.
   *
   * Take precedence overs stroke-dasharray and stroke-dashoffset.
   *
   * TODO: Duration.
   */
  animated?: boolean,
}

export const ChartPolyline = memo(_ChartPolyline);

function _ChartPolyline(
    { points,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
      strokeDasharray,
      strokeDashoffset,
      className,
      animated,
    }: ChartPolylineProps
  ): JSX.Element
{
  const { nx, ny } = useChartContext();
  const [ element, setElement ] = useState<SVGPolylineElement | null>(null);
  const length = element?.getTotalLength();

  return (
    <polyline
      ref={setElement}
      points={
        useMemo(
          () => points.map(([ x, y ]) => `${nx(x)},${ny(y)}`).join(" "),
          [ points, nx, ny ]
        )
      }
      fill={fill}
      stroke={animated && !length ? "none" : stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeDasharray={animated && length ? length : strokeDasharray}
      strokeDashoffset={animated && length ? length : strokeDashoffset}
      className={className}
    >
      {animated && length && (
        <animate
          dur={"1s"}
          fill={"freeze"}
          from={length} to={0}
          attributeName={"stroke-dashoffset"}
          keySplines={"0.0 0.4 0.6 1"}
          calcMode={"spline"}
          repeatCount={1}
        />
      )}
    </polyline>
  );
}
