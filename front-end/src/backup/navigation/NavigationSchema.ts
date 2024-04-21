import { Ajv, type JSONSchemaType } from "Application/schemas";
import { Navigation } from "./Navigation";

export const NavigationSchema = (
  Ajv.compile(
    <JSONSchemaType<Navigation>> {
      type: "object",
      properties: {
        page: {
          type: "string",
          transform: [
            "trim",
            "toLowerCase",
          ],
        },
        label: {
          type: "string",
          nullable: true, // Ajv...
          transform: [ "trim" ],
        },
        parameters: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
          required: [],
        },
      },
      required: [
        "page",
        "parameters",
      ],
    }
  )
);
