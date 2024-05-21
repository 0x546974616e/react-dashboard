import { ReactNode } from "react";
import { useDimensions } from "Application/hooks";
import { DimensionsProvider } from "Application/contexts";
import { Modal } from "Application/components";

export interface Row1g1gmLayoutProps {
  modal: ReactNode,
  children: ReactNode,
  showModal: boolean,
  onModalDismiss?(): void,

  debug?: boolean,
  id?: string,
}

export function Row1g1gmLayout(
    { modal,
      children,
      showModal,
      onModalDismiss,
      debug, id,
    }: Row1g1gmLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <div id={id} style={dimensions} className={"flex flex-row"}>
      <DimensionsProvider
        width={dimensions.width}
        height={dimensions.height}
        debug={debug}
      >
        {children}
      </DimensionsProvider>

      {showModal && (
        <Modal onDismiss={onModalDismiss}>
          <DimensionsProvider
            width={dimensions.width}
            height={dimensions.height}
            debug={debug}
          >
            {modal}
          </DimensionsProvider>
        </Modal>
      )}
    </div>
  );
}
