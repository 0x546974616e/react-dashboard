import { ReactNode } from "react";

import { DimensionsProvider } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface Row1Fixed1Percentage1AutoLayoutProps {
  leftWidth: number,
  middlePercentage: number,
  leftChildren?: ReactNode,
  middleChildren?: ReactNode,
  rightChildren?: ReactNode,
  debug?: boolean,
  id?: string,
}

export function Row1Fixed1Percentage1AutoLayout(
    { leftWidth,
      middlePercentage,
      leftChildren,
      middleChildren,
      rightChildren,
      debug, id,
    }: Row1Fixed1Percentage1AutoLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <div id={id} style={dimensions} className={"flex flex-row"}>
      <DimensionsProvider
        width={leftWidth}
        height={dimensions.height}
        debug={debug}
      >
        {leftChildren}
      </DimensionsProvider>

      <DimensionsProvider
        width={(dimensions.width - leftWidth) * middlePercentage}
        height={dimensions.height}
        debug={debug}
      >
        {middleChildren}
      </DimensionsProvider>

      <DimensionsProvider
        width={(dimensions.width - leftWidth) * (1 - middlePercentage)}
        height={dimensions.height}
        debug={debug}
      >
        {rightChildren}
      </DimensionsProvider>
    </div>
  );
}
