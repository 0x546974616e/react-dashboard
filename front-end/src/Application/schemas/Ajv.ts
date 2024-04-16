import _Ajv, { type JSONSchemaType } from "ajv";

import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";

export { type JSONSchemaType }

export const Ajv = new _Ajv({
  /**
   * Errors are more explicit.
   */
  verbose: true,

  /**
   * Collecting all errors instead of returning after the first encountered one.
   */
  allErrors: true,

  /**
   * Allow using multiple non-null types in "type" keyword.
   *
   * @example `{ type: [ "boolean", "string" ] }`
   */
  allowUnionTypes: true,

  /**
   * Coerce:
   *  - scalar data to an array with one element and vice versa,
   *  - literals 1 and 0 to boolean,
   *  - valid string to number,
   *  - etc.
   *
   * @see:
   *  - https://ajv.js.org/coercion.html
   *  - https://ajv.js.org/options.html#coercetypes
   */
  coerceTypes: "array",
});

addFormats(Ajv, [ "date-time", "date" ]);
addKeywords(Ajv, [ "transform" ]);
