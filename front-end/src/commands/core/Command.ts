import { CommandType } from "./CommandType";

export interface Command {
  name: string,
  brief?: string,
  type: CommandType,
  action(): void,
}
