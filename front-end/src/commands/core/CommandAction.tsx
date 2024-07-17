import { Context, PureComponent, ReactNode } from "react";
import { CommandType } from "./CommandType";
import { CommandContext } from "./CommandContext";
import { Command } from "./Command";

export interface CommandActionProps {
  name: string,
  brief?: string,
  type: CommandType,
  action(): void,
}

export class CommandAction
  extends PureComponent<CommandActionProps>
  implements Command
{
  public static override contextType = CommandContext;
  public declare context: React.ContextType<typeof CommandContext>;

  public id = Math.random().toString(36).slice(2);

  public constructor(props: CommandActionProps) {
    super(props);
  }

  public get name(): string {
    return this.props.name;
  }

  public get brief(): string | undefined {
    return this.props.brief;
  }

  public get type(): CommandType {
    return this.props.type;
  }

  public action = () => {
    this.props.action();
  };

  public override componentDidMount(): void {
    this.context.register(this.id, this);
  }

  public override componentWillUnmount(): void {
    this.context.unregister(this.id);
  }

  public override render(): ReactNode {
    // Nothing to render.
    return null;
  }
}
