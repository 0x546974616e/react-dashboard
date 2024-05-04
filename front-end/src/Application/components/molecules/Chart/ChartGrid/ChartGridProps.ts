
export interface ChartGridProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
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

  renderXLegend?(value: number): string;
  renderYLegend?(value: number): string;
}
