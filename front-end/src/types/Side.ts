
export interface Side {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

export namespace Side {
  export const ZERO: Readonly<Side> = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
