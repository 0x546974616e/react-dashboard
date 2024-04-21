import {
  Fragment,
  ReactNode,
  createElement,
  useEffect,
  useMemo,
  useRef,
} from "react";

/**
 * @return The assigned ID.
 */
export function useLogUpdates(
    props: {
      id?: string,
      disabled?: boolean,
    }
  ): string
{
  const disabled = useRef(props.disabled);
  disabled.current = props.disabled;

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
      if (!disabled.current) {
        console.info("MOUNT", id);
      }
      return () => {
        if (!disabled.current) {
          console.info("UNMOUNT", id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ /* ID is used only once. */ ]
  );

  useEffect(
    () => {
      if (!disabled.current) {
        console.info("UPDATE", id);
      }
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
      disabled?: boolean,
    }
  ): JSX.Element
{
  const id = useLogUpdates(props);

  if (props.as) {
    return createElement(
      props.as, {
        children: props.children,
        "data-log-id": id,
        key: id,
      },
    );
  }

  return (
    <Fragment key={id}>
      {props.children}
    </Fragment>
  );
}
