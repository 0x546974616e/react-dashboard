import { memo, useState } from "react";

import { Tree } from "@app/types";
import { Box, Text } from "@app/components/atoms";
import { TreeChildren } from "./TreeChildren";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface RecursiveTreeProps {
  onTreePress?(tree: Tree): void,
  tree: Tree,
}

export const RecursiveTree = memo(_RecursiveTree);

function _RecursiveTree(
    { tree,
      onTreePress,
    }: RecursiveTreeProps
  ): JSX.Element
{
  const [ subtree, selectSubtree ] = useState<Tree | null>(null);

  return (
    <Box flex={1}>
      <TouchableOpacity onPress={() => onTreePress?.(tree)}>
        <Text>{tree.label}</Text>
      </TouchableOpacity>

      <Box
        flex={1}
        overflow={"hidden"}
      >
        {subtree != null && (
          <RecursiveTree
            onTreePress={() => selectSubtree(null)}
            tree={subtree}
          />
        )}

        {subtree == null && (
          <TreeChildren
            onTreePress={selectSubtree}
            tree={tree}
          />
        )}
      </Box>
    </Box>
  );
}
