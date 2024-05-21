import { ReactNode } from "react";

import { DimensionsProvider } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface Row2p1gLayoutProps {
  leftPercentage: number,
  middlePercentage: number,
  leftChildren?: ReactNode,
  middleChildren?: ReactNode,
  rightChildren?: ReactNode,
  debug?: boolean,
  id?: string,
}

export function Row2p1gLayout(
    { leftPercentage,
      middlePercentage,
      leftChildren,
      middleChildren,
      rightChildren,
      debug, id,
    }: Row2p1gLayoutProps
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
        width={dimensions.width * middlePercentage}
        height={dimensions.height}
        debug={debug}
      >
        {middleChildren}
      </DimensionsProvider>

      <DimensionsProvider
        width={dimensions.width * (1 - leftPercentage - middlePercentage)}
        height={dimensions.height}
        debug={debug}
      >
        {rightChildren}
      </DimensionsProvider>
    </div>
  );
}
