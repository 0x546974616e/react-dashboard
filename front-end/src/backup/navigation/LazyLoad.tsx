import { useEffect, useState } from "react";

export function LazyLoad(
    { value, when, content }: {
      value: string | undefined | null,
      when: string | undefined,
      content(): JSX.Element,
    }
  ): JSX.Element
{
  const [ children, setChildren ] = useState<JSX.Element | null>(null);

  useEffect(
    () => {
      // Overkill this way? Prevent multiple computations of the sub-tree?
      if (children == null && value === when) {
        setChildren(content());
      }
    },
    [ value ]
  );

  return (
    <div
      data-lazy-loaded={Boolean(children)}
      // useMemo overkill?
      style={{
        display: (
          value === when
            ? "block"
            : "none"
        )
      }}
    >
      {children}
    </div>
  );
}
