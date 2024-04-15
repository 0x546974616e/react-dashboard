import { Text } from "./components";
import { LogUpdates } from "./utils";

import { Test } from "back-end";

import "./theme";

export function Main(): JSX.Element {
  const test: Test = { dada: "dada", fafa: 1234 };
  console.log({ test });

  return (
    <div>
      <LogUpdates id="main">
        <Text>Dada</Text>
      </LogUpdates>
    </div>
  );
}
