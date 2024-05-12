
export interface ChevronProps {
  size: number,
}

export function Chevron({ size }: ChevronProps): JSX.Element {
  return (
    <svg
      className={"flex-shrink-0 mx-2 overflow-visible text-gray-400"}
      xmlns={"http://www.w3.org/2000/svg"}
      width={size}
      height={size}
      viewBox={"0 0 24 24"}
      strokeWidth={"3"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      stroke={"currentColor"}
      fill={"none"}
    >
      <path d={"m9 18 6-6-6-6"}></path>
    </svg>
  );
}
