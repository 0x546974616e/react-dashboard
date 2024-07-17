import { ReactNode } from "react";

import { DimensionsProvider } from "@app/contexts";
import { useDimensions } from "@app/hooks";
import { Box } from "@app/components";

export interface Col1g1fLayoutProps {
  topChildren?: ReactNode,
  bottomChildren?: ReactNode,
  bottomHeight: number,
  debug?: boolean,
  id?: string,
}

export function Col1g1fLayout(
    { topChildren,
      bottomChildren,
      bottomHeight,
      debug, id,
    }: Col1g1fLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <Box id={id} style={dimensions}>
      <DimensionsProvider
        parent={dimensions}
        width={dimensions.width}
        height={Math.max(dimensions.height - bottomHeight, 0)}
        debug={debug}
      >
        {topChildren}
      </DimensionsProvider>

      <DimensionsProvider
        parent={dimensions}
        width={dimensions.width}
        height={bottomHeight}
        debug={debug}
      >
        {bottomChildren}
      </DimensionsProvider>
    </Box>
  );
}
