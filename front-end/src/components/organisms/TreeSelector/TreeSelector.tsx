import { memo } from "react";

import { Tree } from "@app/types";
import { Box } from "@app/components/atoms";

import { RecursiveTree } from "./RecursiveTree";

export interface TreeSelectorProps {
  root: Tree,
}

export const TreeSelector = memo(_TreeSelector);

function _TreeSelector(
    { root }: TreeSelectorProps
  ): JSX.Element
{
  return (
    <Box height={"100%"}>
      <RecursiveTree tree={root}/>
    </Box>
  );
}
