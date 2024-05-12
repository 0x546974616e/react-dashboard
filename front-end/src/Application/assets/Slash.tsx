
export interface SlashProps {
  size: number,
}

export function Slash(
    { size }: SlashProps
  ): JSX.Element
{
  return (
    <svg
      className={"flex-shrink-0 mx-2 overflow-visible text-gray-400"}
      xmlns={"http://www.w3.org/2000/svg"}
      width={size}
      height={size}
      viewBox={"0 0 20 20"}
      strokeWidth={"3"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      stroke={"currentColor"}
      fill={"none"}
    >
      <path d={"m5.555 17.776l8-16"}/>
    </svg>
  );
}
