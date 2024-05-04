
export interface Size {
  width: number,
  height: number,
}

export namespace Size {

  export const ZERO: Readonly<Size> = { width: 0, height: 0 };

  /**
   * Return the maximum values or `reference` if unchanged.
   */
  export function max(reference: Size, current: Size): Size {
    const width = Math.max(current.width, reference.width);
    const height = Math.max(current.height, reference.height);

    if (width > reference.width || height > reference.height) {
      return { width, height };
    }

    return reference;
  }
}
