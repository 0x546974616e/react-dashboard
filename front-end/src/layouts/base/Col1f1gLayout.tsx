import { ReactNode } from "react";

import { DimensionsProvider } from "@app/contexts";
import { useDimensions } from "@app/hooks";
import { Box } from "@app/components";

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
    <Box id={id} style={dimensions}>
      <DimensionsProvider
        parent={dimensions}
        width={dimensions.width}
        height={topHeight}
        debug={debug}
      >
        {topChildren}
      </DimensionsProvider>

      <DimensionsProvider
        parent={dimensions}
        width={dimensions.width}
        height={Math.max(dimensions.height - topHeight, 0)}
        debug={debug}
      >
        {bottomChildren}
      </DimensionsProvider>
    </Box>
  );
}
