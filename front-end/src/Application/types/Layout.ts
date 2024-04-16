
/**
 * ```txt
 * - 0
 * | Phone
 * - 860
 * | Tablet
 * - 1024
 * | Laptop
 * - 1440
 * | Desktop
 * - 1920
 * | Desktop
 * - ∞
 * ```
 */
export enum Layout {
  PHONE = 860,
  TABLET = 1024,
  LAPTOP = 1440,
  DESKTOP = 1920,
  // ...
}

export namespace Layout {
  export function fromWidth(width: number): Layout {
    // So far I'm ok with that.
    switch (true) {
      case width <= Layout.PHONE:
        return Layout.PHONE;
      case width <= Layout.TABLET:
        return Layout.TABLET;
      case width <= Layout.LAPTOP:
        return Layout.LAPTOP;
      case width <= Layout.DESKTOP:
        return Layout.DESKTOP;
      default:
        return Layout.DESKTOP;
    }
  }
}
