
export function stringToRegExp(string: string): RegExp {
  // NOTE: Lost source...
  // /[-[\]{}()*+?.,\\^$|#\s]/g
  string = string.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
  return new RegExp(string.replaceAll(/\s+/g, "\\s+"), "ig");
}
