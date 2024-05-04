
/**
 * Screen dimensions.
 *
 * @todo Rename interface.
 */
export interface Dimensions {
  width: number,
  height: number,
}

export namespace Dimensions {
  export function retrieve(): Dimensions {
    return {
      width: (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      ),
      height: (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      ),
    }
  }
}
