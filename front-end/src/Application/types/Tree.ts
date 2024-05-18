
export interface Tree {
  id: string,
  label: string,
  depth: number,
  parent: Tree | null
  children: {
    label: string,
    nodes: Tree[],
  } | null,
}

export namespace Tree {
  export function equal(a: Tree, b: Tree): boolean {
    return a.depth == b.depth && a.id == b.id;
  }
}
