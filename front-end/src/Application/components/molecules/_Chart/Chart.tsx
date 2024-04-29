
// import { Circle as _Circle } from "./elements/Circle";
// import { Group as _Group } from "./elements/Group";
// import { Line as _Line } from "./elements/Line";
// import { Path as _Path } from "./elements/Path";
// import { Rect as _Rect } from "./elements/Rect";
// import { Text as _Text } from "./elements/Text";

export interface ChartProps {
  width: string | number,
  height: string | number,
  viewBoxWidth: number,
  viewBoxHeight: number,
  inset?: number,
}

export function Chart(): JSX.Element {
  return (
    <svg></svg>
  );
}

// ╔╦╗┌─┐┬─┐┌─┐┌─┐
// ║║║├┤ ├┬┘│ ┬├┤
// ╩ ╩└─┘┴└─└─┘└─┘

// export namespace Chart {
//   export const Circle = _Circle;
//   export const Group = _Group;
//   export const Line = _Line;
//   export const Path = _Path;
//   export const Rect = _Rect;
//   export const Text = _Text;
// }
