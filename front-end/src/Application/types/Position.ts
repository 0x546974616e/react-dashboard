
export interface Position {
  x: number,
  y: number,
}

export namespace Position {
  export const ZERO: Readonly<Position> = { x: 0, y: 0 };
}
