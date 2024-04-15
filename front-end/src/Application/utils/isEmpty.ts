
/**
 * Return `true` if an object is empty.
 *
 * @example `{}` is empty.
 */
export function isEmpty(object: object): boolean {
  for (const property in object) {
    if (Object.hasOwn(object, property)) {
      return false;
    }
  }

  return true;
}
