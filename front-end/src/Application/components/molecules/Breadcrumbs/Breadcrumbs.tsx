import { useBreadcrumbs } from "./useBreadcrumbs";
import { BreadcrumbsUnit } from "./BreadcrumbsUnit";
import { useEffect, useRef } from "react";

export interface BreadcrumbsProps {
  children?: Array<{
    onPress?(label: string): void,
    label: string,
  }>,
}

export function Breadcrumbs(
    { children }: BreadcrumbsProps
  ): JSX.Element
{
  let {
    setParent,
    parentWidth,
    allUnitWidths,
    unitWidthsTotal,
    updateUnitWidth,
    firstRender,
  } = useBreadcrumbs();


  const dotsWidth = allUnitWidths[0] ?? 0;
  if (unitWidthsTotal - dotsWidth <= parentWidth) {
    unitWidthsTotal -= dotsWidth;
  }

  return (
    <div
      ref={setParent}
      className={"w-full inline-block"}
    >
      <div className={"flex flex-row"}>
        <BreadcrumbsUnit
          label={"..."}
          separator={true}
          visible={unitWidthsTotal > parentWidth || firstRender}
          onWidth={width => updateUnitWidth({ index: 0, width })}
          lastWidth={allUnitWidths[0]}
        />

        {children?.map(
          ({ label, onPress }, index, { length }) => {
            index += 1;

            const visible = unitWidthsTotal <= parentWidth;
            unitWidthsTotal -= allUnitWidths[index] ?? 0;

            return (
              <BreadcrumbsUnit
                key={label}
                label={label}
                visible={visible || firstRender}
                separator={index < length}
                onWidth={width => updateUnitWidth({ index, width })}
                lastWidth={allUnitWidths[index]}
                onPress={onPress}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
