import { Command } from "./Command";

export type CommandReducerAction = (
  | {
    register: string,
    command: Command,
  }
  | {
    unregister: string,
  }
);

export function commandsReducer(
    commands: Record<string, Command>,
    action: CommandReducerAction,
  ): Record<string, Command>
{
  if ("register" in action) {
    const clone = { ...commands };
    clone[action.register] = action.command;
    return clone;
  }

  if ("unregister" in action) {
    const clone = { ...commands };
    delete clone[action.unregister];
    return clone;
  }

  return commands;
}
