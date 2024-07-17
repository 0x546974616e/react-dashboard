import { Json } from "./Json";

export type Serializable = (
  | Json
  | {
    toString?(): string,
    toJson?(): Json,
  }
);
