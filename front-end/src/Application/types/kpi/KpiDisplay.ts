
export enum KpiDisplay {
  Cumulative,
  Histogram,
  Combined,
}

export namespace KpiDisplay {
  export function reducer(display: KpiDisplay) {
    switch (display) {
      case KpiDisplay.Cumulative:
        return KpiDisplay.Histogram;

      case KpiDisplay.Histogram:
        return KpiDisplay.Combined;

      case KpiDisplay.Combined:
        return KpiDisplay.Cumulative;

      default:
        return KpiDisplay.Cumulative;
    }
  }
}
