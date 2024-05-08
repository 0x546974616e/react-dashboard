import { Position2 } from "./Position2";

export interface Position {
  x: number,
  y: number,
}

export namespace Position {
  export const ZERO: Readonly<Position> = { x: 0, y: 0 };

  export function fromTuple([ x, y ]: Position2): Position {
    return { x, y };
  }

  /**
   * TODO: So far `positions` is an array.
   */
  export function findByX(
      positions: Position2[],
      x: Position["x"],
      lerp?: boolean,
    ): Position | null
  {
    const length = positions.length;

    if (length <= 0) {
      return null;
    }

    if (length <= 1) {
      return Position.fromTuple(
        positions[0]!
      );
    }

    let low = 0;
    let high = length - 2;

    // Binary search.
    while (low <= high) {
      const mid = Math.floor((high + low) / 2);

      const [ x1, y1 ] = positions[mid]!;
      const [ x2, y2 ] = positions[mid + 1]!;

      if (x1 <= x && x < x2) {
        if (lerp) {
          return {
            x, y: y1 + (y2 - y1) * ((x - x1) / (x2 - x1)),
          };
        }
        else {
          return {
            x: x1, y: y1,
          };
        }
      }

      if (x1 < x) {
        low = mid + 1;
      }
      else {
        high = mid - 1;
      }
    }

    // Return the nearest position.
    return Position.fromTuple(
      positions[low <= 0 ? 0 : length - 1]!
    );
  }
}
