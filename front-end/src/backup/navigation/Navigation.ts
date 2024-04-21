import { NavigationSchema } from "./NavigationSchema";
import { isEmpty } from "Application/utils";

export interface Navigation {

  /**
   * A page is the first [segment][segment] of the URL path and it is case
   * insensitive (for our purposes). Note that a nonexistent URL path or equals
   * to "/" will "coerced" to `index`.
   *
   * [segment]: https://datatracker.ietf.org/doc/html/rfc3986#section-3.3
   */
  page: "index" | (string & {}),

  /**
   * All the query string parameters for a given page.
   */
  parameters: Record<string, string>,
}

export namespace Navigation {

  /**
   * Compare two `Navigation`.
   */
  export function equal(a: Navigation, b: Navigation): boolean {

    // First check pages.
    if (a.page.trim().toLowerCase() != b.page.trim().toLowerCase()) {
      return false;
    }

    // Then check parameters with double inclusion
    const { parameters: parametersA } = a;
    const { parameters: parametersB } = b;

    // (a ⊆ b)
    for (const [ keyA, valueA ] of Object.entries(parametersA)) {
      if (!(keyA in parametersB) || parametersB[keyA] !== valueA) {
        return false;
      }
    }

    // (b ⊆ a)
    for (const [ keyB, valueB ] of Object.entries(parametersB)) {
      if (!(keyB in parametersA) || parametersA[keyB] !== valueB) {
        return false;
      }
    }

    return true;
  }

  /**
   * Set the given navigation to the history and change the window title.
   *
   * @see `REACT_APP_TITLE` environment variable.
   */
  export function pushState(navigation: Navigation): void {

    let { page, parameters } = navigation;
    page = page.trim().toLowerCase();

    window.history.pushState(
      navigation, "unused", (
        !isEmpty(parameters)
          ? `/${page}?${new URLSearchParams(parameters)}`
          : `/${page}`
      )
    );
  }

  /**
   * Retrieve the current `Navigation` starting from
   * - the given `PopState` event if provided,
   * - directly from the `history.state` if exists,
   * - from the current URL (`window.locale`),
   * - or return by default the "index" page.
   */
  export function retrieveState(event?: PopStateEvent): Navigation {

    // First try from the given event.
    if (event && event.state) {
      if (NavigationSchema(event.state)) {
        return event.state;
      }
    }

    // Then try from the history object.
    const { state } = window.history;
    if (state && NavigationSchema(state)) {
      return state;
    }

    // Or directly from the current URL.
    const { pathname, search } = window.location;
    const segments = pathname.trim().toLowerCase().split("/");

    if (segments[0] == "") {
      segments.shift();
    }

    return {
      // Only one-level page are supported so far.
      page: segments[0] ? segments[0] : "index",
      parameters: Object.fromEntries(
        new URLSearchParams(search).entries()
      ),
    };
  }
}
