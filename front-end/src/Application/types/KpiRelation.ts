
export interface KpiDifference {
  type: "difference",
  decimals?: number,
}

export interface KpiRelative {
  type: "relative",
  decimals?: number,
}

export type KpiRelation = (
  | boolean
  | KpiDifference
  | KpiRelative
);

export namespace KpiRelation {
  export function compute(
      value1: number,
      value2: number,
      relation?: KpiRelation,
    ): number | null
  {
    if (!relation) {
      return null;
    }

    if (relation === true) {
      // Default relation is difference.
      return value1 - value2;
    }

    switch (relation.type) {
      case "difference": {
        return value1 - value2;
      }

      case "relative": {
        if (value2 == 0) {
          // Return difference to avoid infinity.
          return value1 - value2;
        }

        return (value1 - value2) / value2;
      }

      default: {
        return null;
      }
    }
  }
}
