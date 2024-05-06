
export function computeLegend(
    min: number,
    max: number,
    nearest: number,
    offset?: number,
    render?: (value: number, index: number) => string | null,
  ): {
    labels: (string | null)[],
    maxLength: number,
    min: number,
    max: number,
  }
{
  nearest = Math.abs(nearest);
  offset = Math.min(nearest, Math.abs(offset ?? 0))

  let value = Math.floor(min / nearest) * nearest;

  if (offset) {
    value = (
      value + offset > min
        ? value - offset
        : value + offset
    );
  }

  let maxLength = 0;
  const labels: (string | null)[] = [];

  let first = value;
  let last = value;

  while (value < max + nearest) {
    const label = (
      render
        ? render(value, labels.length)
        : value.toString()
    );

    if (label && label.length > maxLength) {
      maxLength = label.length;
    }

    last = value;
    labels.push(label);
    value += nearest;
  }

  return {
    labels,
    maxLength,
    min: first,
    max: last,
  };
}
