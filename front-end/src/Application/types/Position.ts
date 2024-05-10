import { clamp } from "Application/utils";
import { Interpolation, InterpolationOptions } from "./Interpolation";

export interface Position {
  x: number,
  y: number,
}

export namespace Position {
  export const ZERO: Readonly<Position> = { x: 0, y: 0 };

  export function minMax(
      ...positions: (
        | Position
        | Position[]
        | undefined
        | null
      )[]
    ): null | {
      min: Position,
      max: Position,
    }
  {
    let browsed = false;

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;

    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const position of positions) {
      if (!position) {
        continue;
      }

      browsed = true;

      if (Array.isArray(position)) {
        for (const current of position) {
          const { x, y } = current;

          if (x < minX) minX = x;
          if (y < minY) minY = y;

          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
      else {
        const { x, y } = position;

        if (x < minX) minX = x;
        if (y < minY) minY = y;

        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }

    if (browsed) {
      return {
        min: {
          x: minX,
          y: minY,
        },
        max: {
          x: maxX,
          y: maxY,
        },
      };
    }

    return null;
  }

  /**
   * TODO: So far `positions` is an array.
   */
  export function findNearestByX(
      positions: Position[],
      givenX: Position["x"],
      interpolation?: Interpolation,
      interpolationOptions?: InterpolationOptions,
    ): Position | null
  {
    const length = positions.length;

    if (length <= 0) {
      return null;
    }

    if (length <= 1) {
      return positions[0]!;
    }

    let low = 0;
    let high = length - 2;

    // Binary search.
    while (low <= high) {
      const mid = Math.floor((high + low) / 2);

      const { x: x1, y: y1 } = positions[mid]!;
      const { x: x2, y: y2 } = positions[mid + 1]!;

      if ((x1 <= givenX && givenX < x2)) {
        switch (interpolation) {
          case Interpolation.Linear:
            return {
              x: givenX,
              y: y1 + (y2 - y1) * ((givenX - x1) / (x2 - x1)),
            };

          case Interpolation.Horizontal:
            let x = givenX;

            if (interpolationOptions) {
              let {
                horizontalWidth: width,
                horizontalOffset: offset,
              } = interpolationOptions;

              if (width || offset) {
                width ??= 1.0;
                offset ??= 0.0;

                x = clamp(x,
                  x1 + (x2 - x1) * (offset),
                  x1 + (x2 - x1) * (offset + width),
                );
              }
            }

            return {
              x, y: y2
            };

          default:
            return {
              x: x1,
              y: y1,
            };
        }
      }

      if (x1 < givenX) {
        low = mid + 1;
      }
      else {
        high = mid - 1;
      }
    }

    // Return the nearest position.
    if (low <= 0) {
      if (interpolation != Interpolation.Horizontal) {
        return positions[0]!;
      }

      let offset = 0.0;

      if (interpolationOptions) {
        offset = interpolationOptions.horizontalOffset ?? offset;
      }

      const { x: x1 } = positions[0]!;
      const { x: x2, y: y2 } = positions[1]!;

      return {
        x: x1 + (x2 - x1) * offset,
        y: y2,
      };
    }
    else {
      if (interpolation != Interpolation.Horizontal) {
        return positions[length - 1]!;
      }

      let width = 1.0;
      let offset = 0.0;

      if (interpolationOptions) {
        width = interpolationOptions.horizontalWidth ?? width;
        offset = interpolationOptions.horizontalOffset ?? offset;
      }

      const { x: x1 } = positions[length - 2]!;
      const { x: x2, y: y2 } = positions[length - 1]!;

      return {
        x: x1 + (x2 - x1) * (width + offset),
        y: y2,
      };
    }
  }
}
