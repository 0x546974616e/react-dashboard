
export enum Interpolation {
  Horizontal,
  Linear,
}

export interface InterpolationOptions {
  /** [ 0.0, 1.0 ] of the width */
  horizontalWidth?: number,

  /** [ 0.0, 1.0 ] of the width */
  horizontalOffset?: number,
}
