import { Interpolation } from "./Interpolation";

export interface Position {
  x: number,
  y: number,
}

export namespace Position {
  export const ZERO: Readonly<Position> = { x: 0, y: 0 };

  /**
   * TODO: So far `positions` is an array.
   */
  export function findNearestByX(
      positions: Position[],
      givenX: Position["x"],
      interpolation?: Interpolation,
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

      if (x1 <= givenX && givenX < x2) {
        switch (interpolation) {
          case Interpolation.Linear:
            return {
              x: givenX,
              y: y1 + (y2 - y1) * ((givenX - x1) / (x2 - x1)),
            };

          case Interpolation.Horizontal:
            return {
              x: givenX,
              y: y2
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

    if (low <= 0) {
      const position = positions[0]!;

      if (interpolation == Interpolation.Horizontal) {
        return {
          x: position.x,
          y: positions[1]!.y,
        };
      }

      return position;
    }

    // Return the nearest position.
    return positions[length - 1]!;
  }
}
