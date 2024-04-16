import { ReactNode, createElement, useEffect, useMemo } from "react";

/**
 * @return The assigned ID.
 */
export function useLogUpdates(
    props: { id?: string }
  ): string
{
  const id = useMemo(
    () => {
      const id = props.id?.trim();
      return id ? id : Math.random().toString(36).slice(2);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ /* ID is used only once. */ ]
  );

  useEffect(
    () => {
      console.info("MOUNT", id);
      return () => console.info("UNMOUNT", id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ /* ID is used only once. */ ]
  );

  useEffect(
    () => {
      console.info("UPDATE", id);
    }
  );

  return id;
}

/**
 * Log mounts, unmounts and updates.
 */
export function LogUpdates<As extends string>(
    props: {
      id?: string,
      as?: Lowercase<As>,
      children?: ReactNode,
    }
  ): JSX.Element
{
  const id = useLogUpdates(props);

  return (
    createElement(
      props.as ?? "div", {
        children: props.children,
        "data-log-id": id,
        key: id,
      },
    )
  );
}
