import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useChartContext } from "Application/contexts";
import { Position } from "Application/types";
import { ChartPolylineTheme } from "Application/theme";

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
  points: Position[],

  /** Take precedence overs stroke-dasharray and stroke-dashoffset. */
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
  const [ animate, setAnimate ] = useState<SVGAnimateElement | null>(null);
  const length = element?.getTotalLength();

  useEffect(() => { animate?.beginElement() }, [ animate, points ]);

  return (
    <polyline
      ref={setElement}
      points={
        useMemo(
          () => points.map(({ x, y }) => `${nx(x)},${ny(y)}`).join(" "),
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
          // @ts-expect-error
          ref={setAnimate}
          from={length} to={0}
          attributeName={"stroke-dashoffset"}
          calcMode={"spline"}
          keySplines={ChartPolylineTheme.splines}
          dur={ChartPolylineTheme.duration}
          repeatCount={1}
          fill={"freeze"}
        />
      )}
    </polyline>
  );
}
