import { ReactNode, RefObject, useRef, useState } from "react";
import { Modal } from "Application/components/atoms";
import { Dimensions } from "Application/types";

export type StickModalProps = JSX.IntrinsicElements["button"] & {
  button: ReactNode;
};

function getBBox(container: RefObject<HTMLDivElement>) {
  const { current } = container;
  if (!current) {
    return undefined;
  }

  const { top, left, height } = current.getBoundingClientRect();
  const { width: screenWidth, height: screenHeight } = Dimensions.retrieve();

  return {
    left: left,
    top: top + height,
    maxWidth: screenWidth - left,
    maxHeight: screenHeight - (top + height),
  };
}

export function StickModal(
    { button,
      onClick,
      children,
      ...props
    }: StickModalProps
  ): JSX.Element
{
  const [ modal, setModal ] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const dada = container.current?.getBoundingClientRect();

  return (
    <div ref={container}>
      <button
        onClick={
          (event) => {
            onClick?.(event);
            setModal(true);
          }
        }
        {...props}
      >
        {button}
      </button>

      {modal && (
        <Modal
          onDismiss={
            () => setModal(false)
          }
        >
          <div
            className={"absolute"}
            style={getBBox(container)}
          >
            {children}
          </div>
        </Modal>
      )}
    </div>
  );
}
