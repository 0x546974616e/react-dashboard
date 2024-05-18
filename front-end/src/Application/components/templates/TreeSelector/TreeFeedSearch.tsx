import { FormEvent, useCallback } from "react";
import { stringToRegExp } from "Application/utils";

export interface TreeFeedSearchProps {
  onSearchPattern(regexp: RegExp | null): void,
  placeholder?: string,
}

export function TreeFeedSearch(
    { placeholder,
      onSearchPattern,
    }: TreeFeedSearchProps
  ): JSX.Element
{
  return (
    <div>
      <input
        type={"text"}
        placeholder={`${placeholder ?? "Search"}...`}
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
  );
}
