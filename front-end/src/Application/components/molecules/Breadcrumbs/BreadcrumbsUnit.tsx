import { Slash } from "Application/assets";

export interface BreadcrumbsUnitProps {
  label: string,
  onPress?(label: string): void,
  onWidth(width: number): void,
  lastWidth?: number,
  separator?: boolean,
  visible?: boolean,
}

export function BreadcrumbsUnit(
    { label,
      onPress,
      onWidth,
      lastWidth,
      separator,
      visible,
    }: BreadcrumbsUnitProps
  ): JSX.Element
{
  // Component must not be unmounted hence `visible`.

  return (
    <div
      className={"whitespace-nowrap"}
      ref={ // No useCallback().
        (element: HTMLDivElement) => {
          if (element) {
            const width = Math.ceil(element.getBoundingClientRect().width);
            if (width != lastWidth && width > 0) {
              onWidth(width);
            }
          }
        }
      }
    >
      {visible && (
        <div className={"flex flex-row items-center shrink-0 min-w-fit"}>
          <span
            onClick={() => onPress?.(label)}
            className={onPress ? "cursor-pointer hover:underline" : undefined}
          >
            {label}
          </span>
          {separator && (
            <Slash size={16}/>
          )}
        </div>
      )}
    </div>
  );
}
