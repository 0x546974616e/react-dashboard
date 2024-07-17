import { createContext } from "react";
import { Command } from "./Command";

export interface CommandContext {
  register(id: string, command: Command): void,
  unregister(id: string): void,
}

export const CommandContext= (
  createContext<CommandContext>({
    register: () => {},
    unregister: () => {},
  })
);
