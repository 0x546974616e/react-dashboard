import { memo, useEffect, useRef } from "react";

import { useChartContext } from "Application/contexts";
import { ChartRectTheme } from "Application/theme";

export interface ChartRectProps extends
  Pick<JSX.IntrinsicElements["rect"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "className"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,

  animated?: boolean,
}

export const ChartRect = memo(_ChartRect);

function _ChartRect(
    { x, y, w, h,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
      className,
      animated,
    }: ChartRectProps
  ): JSX.Element
{
  const { nx, ny, nw, nh } = useChartContext();

  const animate1 = useRef<SVGAnimateElement | null>(null);
  const animate2 = useRef<SVGAnimateElement | null>(null);


  const ww = nw(w);

  //#region Temporary tests for animation.
  const a = useRef(0);
  const b = useRef(h);

  if (b.current != h) {
    a.current = b.current;
    b.current = h;
  }

  const h0 = nh(a.current);
  const hh = nh(b.current);
  //#endregion

  const fromY = ny(y);

  useEffect(
    () => {
      animate1.current?.beginElement();
      animate2.current?.beginElement();
    },
    [ fromY, hh ] // Mmmm?
  );

  return (
    <rect
      x={nx(x) + (ww < 0 ? ww : 0)}
      y={fromY + (hh < 0 ? hh : 0)}
      width={Math.abs(ww)}
      height={Math.abs(hh)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      className={className}
    >
      {animated && hh < 0 && (
        <animate
          ref={animate1}
          // .@ts-expect-error
          // ref={setAnimate1}
          from={fromY}
          to={fromY + hh}
          attributeName={"y"}
          calcMode={"spline"}
          keySplines={ChartRectTheme.splines}
          dur={ChartRectTheme.duration}
          repeatCount={1}
          fill={"freeze"}
        />
      )}

      {animated && (
        <animate
          ref={animate2}
          // .@ts-expect-error
          // ref={setAnimate2}
          from={Math.abs(h0)}
          to={Math.abs(hh)}
          attributeName={"height"}
          calcMode={"spline"}
          keySplines={ChartRectTheme.splines}
          dur={ChartRectTheme.duration}
          repeatCount={1}
          fill={"freeze"}
        />
      )}
    </rect>
  );
}
