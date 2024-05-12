import { ReactNode } from "react";

import { DimensionsProvider } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface Col1Fixed1GrowLayoutProps {
  topHeight: number,
  topChildren?: ReactNode,
  bottomChildren?: ReactNode,
  debug?: boolean,
  id?: string,
}

export function Col1Fixed1GrowLayout(
    { topHeight,
      topChildren,
      bottomChildren,
      debug, id,
    }: Col1Fixed1GrowLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <div id={id} style={dimensions}>
      <DimensionsProvider
        width={dimensions.width}
        height={topHeight}
        debug={debug}
      >
        {topChildren}
      </DimensionsProvider>

      <DimensionsProvider
        width={dimensions.width}
        height={Math.max(dimensions.height - topHeight, 0)}
        debug={debug}
      >
        {bottomChildren}
      </DimensionsProvider>
    </div>
  );
}
