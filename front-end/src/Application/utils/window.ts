
/**
 * Get current browser viewpane heigtht
 *
 * @see https://stackoverflow.com/a/9348993
 */
export function getWindowHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight || 0
  );
}

/**
 * Get current absolute window scroll position
 *
 * @see https://stackoverflow.com/a/9348993
 */
export function getWindowYScroll() {
  return (
    window.pageYOffset ||
    document.body.scrollTop ||
    document.documentElement.scrollTop || 0
  );
}

/**
 * Get current absolute document height
 *
 * @see https://stackoverflow.com/a/9348993
 */
export function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0,
    document.body.clientHeight || 0,
    document.documentElement.clientHeight || 0
  );
}

/**
 * Get current vertical scroll percentage
 *
 * @see https://stackoverflow.com/a/9348993
 */
export function getWindowYScrollPercentage() {
  // return (getWindowYScroll() + getWindowHeight()) / getDocumentHeight();
  return (getWindowYScroll() / (getDocumentHeight() - getWindowHeight()))
}
