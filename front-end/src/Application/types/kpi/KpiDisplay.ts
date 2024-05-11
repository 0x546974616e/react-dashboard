
export enum KpiDisplay {
  Cumulative,
  Combined,
  Histogram,
}

export namespace KpiDisplay {

  /**
   * TODO: Move.
   */
  export function reducer(display: KpiDisplay) {
    switch (display) {
      case KpiDisplay.Cumulative:
        return KpiDisplay.Combined;

      case KpiDisplay.Combined:
        return KpiDisplay.Histogram;

      case KpiDisplay.Histogram:
        return KpiDisplay.Cumulative;


      default:
        return KpiDisplay.Cumulative;
    }
  }
}
