
export type Json = null | string | number | boolean | Json[] | JsonObject;

export type JsonObject = {
  [name: string]: Json;
};
