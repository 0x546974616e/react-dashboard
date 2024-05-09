
export interface ChartGroupProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
    | "className"
  >
{
  name?: string,
}

export function ChartGroup(
    { name,
      children,
      className,
    }: ChartGroupProps
  ): JSX.Element
{
  return (
    <g
      data-name={name}
      className={className}
    >
      {children}
    </g>
  );
}
