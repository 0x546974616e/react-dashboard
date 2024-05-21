import { ReactNode } from "react";
import { useDimensions } from "Application/hooks";
import { DimensionsProvider } from "Application/contexts";
import { Modal } from "Application/components";

export interface Row1p1pm1gLayoutProps {
  leftPercentage: number,
  leftChildren: ReactNode,
  rightChildren: ReactNode,

  showLeftModal: boolean,
  onLeftModalDismiss?(): void,
  leftModal: ReactNode,

  debug?: boolean,
  id?: string,
}

export function Row1p1pm1gLayout(
    { leftPercentage,
      leftChildren,
      rightChildren,

      showLeftModal,
      onLeftModalDismiss,
      leftModal,

      debug, id,
    }: Row1p1pm1gLayoutProps
  ): JSX.Element
{
  const dimensions = useDimensions();

  return (
    <div id={id} style={dimensions} className={"flex flex-row"}>
      <DimensionsProvider
        width={dimensions.width * leftPercentage}
        height={dimensions.height}
        debug={debug}
      >
        {leftChildren}
      </DimensionsProvider>

      {showLeftModal && (
        <Modal onDismiss={onLeftModalDismiss}>
          <DimensionsProvider
            width={dimensions.width * leftPercentage}
            height={dimensions.height}
            debug={debug}
          >
            {leftModal}
          </DimensionsProvider>
        </Modal>
      )}

      <DimensionsProvider
        width={dimensions.width * (1 - leftPercentage)}
        height={dimensions.height}
        debug={debug}
      >
        {rightChildren}
      </DimensionsProvider>
    </div>
  );
}
