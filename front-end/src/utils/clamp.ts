
export function clamp(
    value: number,
    min: number,
    max: number,
  ): number
{
  if (min > max) {
    return Math.min(Math.max(value, max), min);
  }

  return Math.min(Math.max(value, min), max);
}
