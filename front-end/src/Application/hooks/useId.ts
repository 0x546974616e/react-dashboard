import { useMemo } from "react";

/**
 * Generates a random ID only once. Updading `prefix` will not update the ID.
 *
 * @deprecated See React `useID()`.
 */
export function useId(prefix?: string): string {
  return useMemo(
    () => {
      const id = Math.random().toString(36).slice(2);
      return prefix ? `${prefix}-${id}` : id;
    }, []
  );
}
