import { ReactNode } from "react";

import { DimensionsProvider } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface Row1Percentage1AutoLayoutProps {
  leftPercentage: number,
  leftChildren?: ReactNode,
  rightChildren?: ReactNode,
  debug?: boolean,
  id?: string,
}

export function Row1Percentage1AutoLayout(
    { leftPercentage,
      leftChildren,
      rightChildren,
      debug, id,
    }: Row1Percentage1AutoLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <div id={id} style={dimensions} className={"flex flex-row"}>
      <DimensionsProvider
        width={dimensions.width * leftPercentage}
        height={dimensions.height}
        debug={debug}
      >
        {leftChildren}
      </DimensionsProvider>

      <DimensionsProvider
        width={dimensions.width * (1 - leftPercentage)}
        height={dimensions.height}
        debug={debug}
      >
        {rightChildren}
      </DimensionsProvider>
    </div>
  );
}
