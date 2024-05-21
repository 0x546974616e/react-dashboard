import { ReactNode } from "react";

import { DimensionsProvider } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface Col1f1gLayoutProps {
  topHeight: number,
  topChildren?: ReactNode,
  bottomChildren?: ReactNode,
  debug?: boolean,
  id?: string,
}

export function Col1f1gLayout(
    { topHeight,
      topChildren,
      bottomChildren,
      debug, id,
    }: Col1f1gLayoutProps
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
