
export interface ChartGridProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
    | "stroke"
    | "strokeWidth"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,

  minX: number,
  minY: number,

  maxX: number,
  maxY: number,

  nearestXLegend: number,
  nearestYLegend: number,

  offsetXLegend?: number,
  offsetYLegend?: number,

  renderXLegend?(value: number, index: number): string | null;
  renderYLegend?(value: number, index: number): string | null;

  debug?: boolean,
}
