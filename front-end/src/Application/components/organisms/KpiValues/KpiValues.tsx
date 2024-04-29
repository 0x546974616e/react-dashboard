import { useCallback, useMemo, useRef, useTransition } from "react";
import { LuBarChartBig, LuInfo, LuMedal } from "react-icons/lu";
import { KpiFeature, KpiFormat, KpiRelation } from "Application/types";
import "./KpiValues.scss";
import { useLongPress } from "Application/hooks";
import { useTranslation } from "react-i18next";

export interface KpiValuesProps {
  title?: string,
  value1?: number,
  value2?: number,
  format?: KpiFormat,
  decimals?: number,
  relation?: KpiRelation,

  features?: Partial<Record<KpiFeature, boolean>>,
  onPress?(feature?: KpiFeature): void,
  onLongPress?(): void,
  onContextMenu?(): void,
}

export function KpiValues(
    { title,
      value1,
      value2,
      decimals,
      relation,
      features,
      onPress,
      onLongPress,
      onContextMenu,
    }: KpiValuesProps
  ): JSX.Element
{
  const { t } = useTranslation();

  const container = useRef(null);

  const dada = useMemo(
    () => (
      value1 != undefined && value2 != undefined
        ? KpiRelation.compute(value1, value2, relation)
        : null
    ),
    [ value1, value2, relation ]
  );

  const fafa = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // TODO: Check for capture/bubling phase instead.

      // NOTE: Below is a workaround so far.
      let i = 0, target = event.target as HTMLElement | null;
      while (target && i++ < 5) { // Arbitrary limit.
        if (target.classList?.contains("kpi-feature")) {
          return;
        }

        // Keep going upward.
        target = target.parentElement;
      }

      onPress?.();
    }, []
  );

  const hasOnPress = onPress || onLongPress;

  return (
    <div
      ref={container}
      {...useLongPress(fafa, onLongPress, {})}
      onContextMenu={onContextMenu}
      className={
        `p-4 rounded-md hover:bg-stone-100 shadow ${
          hasOnPress
            ? "cursor-pointer"
            : ""
        } ${
          dada == null || Math.random()
            ? "bg-stone-50"
            : dada >= 0
              ? "bg-green-100"
              : "bg-red-100"
        }`
      }
    >
      <div className="flex flex-row items-center gap-2 mb-2 text-stone-800">
        {title && (
          <div className="mr-auto">
            {title}
          </div>
        )}

        {features?.graph && hasOnPress && (
          <div
            className={"kpi-feature shrink-0 p-1 rounded hover:bg-stone-200 text-stone-400"}
            onClick={() => onPress?.(KpiFeature.GRAPH)}
            title={t("kpi.feature.graph")}
          >
            <LuBarChartBig/>
          </div>
        )}

        {features?.ranking && hasOnPress && (
          <div
            className={"kpi-feature shrink-0 p-1 rounded hover:bg-stone-200 text-stone-400"}
            onClick={() => onPress?.(KpiFeature.RANKING)}
            title={t("kpi.feature.ranking")}
          >
            <LuMedal/>
          </div>
        )}

        {features?.info && hasOnPress && (
          <div
            className={"kpi-feature shrink-0 p-1 rounded hover:bg-stone-200 text-stone-400"}
            onClick={() => onPress?.(KpiFeature.INFO)}
            title={t("kpi.feature.info")}
          >
            <LuInfo/>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 text-stone-900">
        {/* divide-x-2 divide-stone-200 */}
        <div className="grow text-left text-xl font-medium w-1/2">
          <span className="text-blue-500 font-bold mr-2">•</span>
          {value1}
          {dada != null && (
            <sup
              className={
                dada >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {dada >= 0 && "+"}
              {dada}
            </sup>
          )}
        </div>
        <div className="text-right text-xl font-medium pl-4">
          <span className="text-blue-200 font-bold mr-2">•</span>
          {value2}
        </div>
      </div>
    </div>
  );
}
