import { ReactNode, useMemo } from "react";
import { Box } from "@app/components/atoms/Box";
import { Text } from "@app/components/atoms/Text";
import { DimensionsContext } from "./DimensionsContext";

export type DimensionsProviderProps = (
  DimensionsContext & {
    children?: ReactNode,
    debug?: boolean,
    id?: string,
  }
);

export function DimensionsProvider(
    { width,
      height,
      parent,
      children,
      debug,
      id,
    }: DimensionsProviderProps
  ): JSX.Element
{
  const value = useMemo(
    () => ({
      width,
      height,
      parent
    }),
    [ width, height, parent ]
  );

  return (
    <DimensionsContext.Provider value={value}>
      <Box id={id} position={debug ? "relative" : undefined}>
        <Box width={width} height={height} overflow={"hidden"}>
          {children}
        </Box>

        {debug && (
          // TODO: On hover or click move it to right.
          <Box
            top={0} left={0}
            position={"absolute"}
            paddingVertical={"1"}
            paddingHorizontal={"2"}
            backgroundColor={"red"}
          >
            <Text>
              {width.toFixed(0)}×{height.toFixed(0)}
            </Text>
          </Box>
        )}
      </Box>
    </DimensionsContext.Provider>
  );
}
