import { FormEvent, useCallback, useId, useRef } from "react";
import { VscClose, VscFilter, VscSearch } from "react-icons/vsc";
import { BsSortAlphaDown, BsSortAlphaUpAlt, BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";
import { StickModal } from "Application/components/molecules";
import { join, stringToRegExp } from "Application/utils";

import "./TreeFeedSearch.scss";

export interface TreeFeedSearchProps {
  onSearchPattern(regexp: RegExp | null): void,
  placeholder?: string,
  first?: boolean,
  last?: boolean,
}

export function TreeFeedSearch(
    { first, last,
      placeholder,
      onSearchPattern,
    }: TreeFeedSearchProps
  ): JSX.Element
{
  const id = useId();
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className={"tree-feed-search relative flex flex-row gap-2 px-4 pt-2 w-full"}>
      <label
        htmlFor={id}
        className={
          join(
            "tree-feed-search-label",
            "cursor-pointer",
            "flex flex-row grow",
            "px-2 py-1 min-w-0",
            "border rounded-lg",
            "border-stone-200",
            // "hover:border-indigo-600",
            // "focus-within:border-indigo-600",
          )
        }
      >
        <div className={"shrink-0"}>
          {!first && (
            <div className={"absolute flex top-0 bottom-1/2 w-6 justify-center"}>
              <div className={"w-[2px] bg-indigo-500"}/>
            </div>
          )}

          {!last && (
            <div className={"absolute flex top-1/2 bottom-0 w-6 justify-center"}>
              <div className={"w-[2px] bg-indigo-500"}/>
            </div>
          )}

          <div className={"relative flex w-6 h-full items-center justify-center"}>
            <div className={"h-1.5 w-1.5 rounded-full bg-indigo-50 ring-[2px] ring-indigo-500"}/>
          </div>
        </div>

        <div className={"flex-1 ml-2"}>
          <input
            id={id}
            ref={input}
            type={"text"}
            className={"w-full appearance-none outline-none accent-indigo-600"}
            placeholder={`${placeholder ?? "Search"}...`}
            onKeyUp={
              function(event) {
                const key = event.key || event.charCode || event.keyCode || event.which;
                if (key == "Escape" || key == 27) {
                  event.currentTarget.value = "";
                  onSearchPattern(null);
                }
              }
            }
            onInput={
              useCallback(
                (event: FormEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value.trim().toLowerCase();
                  onSearchPattern?.(value ? stringToRegExp(value) : null);
                }, []
              )
            }
          />
        </div>

        <div
          className={"close flex items-center shrink-0"}
          onClick={
            useCallback(
              () => {
                if (input.current) {
                  input.current.value = "";
                  onSearchPattern(null);
                }
              }, []
            )
          }
        >
          <VscClose size={"1.25em"}/>
        </div>

        <div className={"flex items-center shrink-0"}>
          <VscSearch size={"1.25em"}/>
        </div>
      </label>

      <StickModal
        className={
          join(
            "tree-filter",
            "text-white",
            "cursor-pointer",
            "px-2 py-1 h-full shrink-0",
            "flex flex-row items-center",
            "border rounded-lg",
            "border-indigo-600",
            "accent-indigo-600",
            "hover:border-indigo-700",
            "bg-indigo-500",
          )
        }
        button={
          <VscFilter
            title={`Filter ${placeholder}`}
            size={"1.25em"}
          />
        }
      >
        <div
          className={
            join(
              "flex flex-col gap-2 p-4",
              "rounded-lg border border-stone-200 bg-stone-50",
            )
          }
        >
          <p>Sort:</p>
          <div className={"flex flex-row gap-2"}>
            <div className={"cursor-pointer p-2 bg-white rounded-lg border border-stone-100"}>
              <BsSortAlphaDown size={"1.25em"}/>
            </div>

            <div className={"cursor-pointer p-2 bg-white rounded-lg border border-stone-100"}>
              <BsSortAlphaUpAlt size={"1.25em"}/>
            </div>

            <div className={"cursor-pointer p-2 bg-white rounded-lg border border-stone-100"}>
              <BsSortNumericDown size={"1.25em"}/>
            </div>

            <div className={"cursor-pointer p-2 bg-white rounded-lg border border-stone-100"}>
              <BsSortNumericUpAlt size={"1.25em"}/>
            </div>
          </div>
          <p>Display:</p>
          <div>
            TODO: Turnover, Basket, etc.
          </div>
        </div>
      </StickModal>
    </div>
  );
}
