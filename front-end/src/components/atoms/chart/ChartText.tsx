import { memo, useCallback, useRef } from "react";
import { LayoutRectangle } from "react-native";
import { Text, TextProps } from "react-native-svg";
import { ChartContext } from "@app/contexts";

export interface ChartTextProps extends
  Pick<TextProps,
    | "children"
    | "fill"
    | "textAnchor"
    | "alignmentBaseline"
  >
{
  x: number,
  y: number,

  onLayout?(rect: LayoutRectangle): void,
}

export const ChartText = memo(_ChartText);

function _ChartText(
    { x, y,
      onLayout,
      children,
      fill,
      textAnchor,
      alignmentBaseline,
    }: ChartTextProps
  ): JSX.Element
{
  const ref = useRef<Text | null>(null);

  const onTextRef = useCallback(
    (element: Text | null) => {
      ref.current = element;
      const layout = element?.getBBox();
      if (layout && onLayout) {
        onLayout(layout)
      }
    }, []
  );

  const onTextLayout = useCallback(
    () => {
      if (ref.current) {
        onTextRef(ref.current);
      }
    }, []
  );

  return (
    <ChartContext.Consumer>
      {({ nx, ny }) => (
        <Text
          x={nx(x)}
          y={ny(y)}
          fill={fill}
          textAnchor={textAnchor}
          alignmentBaseline={alignmentBaseline}
          onLayout={onTextLayout}
          ref={onTextRef}
        >
          {children}
        </Text>
      )}
    </ChartContext.Consumer>
  );
}
