
export enum Interpolation {
  Horizontal,
  Linear,
}

export interface InterpolationOptions {
  horizontalMargin?: number,

  /** @pre abs(offset) <= abs(margin) */
  horizontalOffset?: number,
}
