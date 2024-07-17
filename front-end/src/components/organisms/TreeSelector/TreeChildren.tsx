import { useState } from "react";

import { Tree } from "@app/types";
import { Box, Text } from "@app/components/atoms";
import { FlatList, Swipeable } from "react-native-gesture-handler";
import { Animated } from "react-native";
import { TreeChildrenNode } from "./TreeChildrenNode";

export interface TreeChildrenProps {
  onTreePress?(tree: Tree): void,
  tree: Tree,
}

export function TreeChildren(
    { tree: { children },
      onTreePress,
    }: TreeChildrenProps
  ): JSX.Element
{
  // const [ search, setSearch ] = useState<RegExp | null>(null);

  if (!children) {
    return (
      <Box>
        <Text>TODO Tips</Text>
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      height={"100%"}
      flexDirection={"column"}
    >
      <Text>
        Search & Filter
      </Text>

      <Box
        flex={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Text>{children.label}</Text>
        <Text>Turnover</Text>
      </Box>


      <FlatList
        style={{ flex: 1 }}
        data={children.nodes}
        renderItem={
          ({ item: tree }) => (
            <TreeChildrenNode
              key={tree.id}
              onRight={onTreePress}
              tree={tree}
            />
          )
        }
      />

      {/* <Box flex={1}>
        {children.nodes.map(
          (tree, index, { length }) => (
          )
        )}
      </Box> */}

    </Box>
  );
}
