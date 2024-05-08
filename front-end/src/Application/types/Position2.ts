
export type Position2 = [
  x: number,
  y: number,
];

export namespace Position2 {
  export function cumulativeYSum(positions: Position2[]): Position2[] {
    let y = 0;

    return positions.map(
      ([ x, cy ]) => [ x, y += cy ]
    );
  }

  export function minMax(positions: Position2[]):
    null | [
      min: Position2,
      max: Position2,
    ]
  {
    if (positions.length <= 0) {
      return null;
    }

    let [ minX, minY ] = positions[0]!;
    let [ maxX, maxY ] = positions[0]!;

    for (const [ x, y ] of positions) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;

      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    return [
      [ minX, minY ],
      [ maxX, maxY ],
    ];
  }
}
