import React from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

interface ModalProps {
  children?: React.ReactNode,
  onDismiss?(): void,
}

export class Modal extends React.PureComponent<ModalProps> {
  private static _ROOT: HTMLElement | null;
  private _element = document.createElement("div");

  public constructor(props: ModalProps) {
    super(props);

    if (Modal._ROOT == null) {
      Modal._ROOT = document.getElementById("modal");
    }
  }

  private _onElementClick = (event: MouseEvent) => {
    if (event.target == Modal._ROOT || event.eventPhase == 2) {
      this.props.onDismiss?.();
    }
  };

  private _onVisibilityChange = () => {
    this.props.onDismiss?.();
  };

  private _onWindowResize = () => {
    this.props.onDismiss?.();
  };

  public override componentDidMount() {
    const root = Modal._ROOT;

    if (root) {
      root.appendChild(this._element);
      this._element.addEventListener("click", this._onElementClick, true);
      document.addEventListener("visibilitychange", this._onVisibilityChange, true);
      window.addEventListener("resize", this._onWindowResize, true);

      // Prevent <body> to be scrollable.
      document.body.style.overflow = "hidden";
    }
  }

  public override componentWillUnmount() {
    const root = Modal._ROOT;

    if (root) {
      root.removeChild(this._element);
      this._element.removeEventListener("click", this._onElementClick, true);
      document.removeEventListener("visibilitychange", this._onVisibilityChange, true);
      window.removeEventListener("resize", this._onWindowResize, true);

      // Reset <body> scrollbar.
      if (root.children.length <= 0) {
        document.body.style.overflow = "";
      }
    }
  }

  public override render() {
    return ReactDOM.createPortal(
      this.props.children,
      this._element,
    );
  }
}
