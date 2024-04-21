
export type Pages = Page[];

export interface Page {

  /**
   * TODO: Add multi languages path?
   */
  path: string,

  /**
   * Optional label along with the page (mainly used to be displayed in the
   * `<title>` HTML tag along with the application title).
   */
  i18nLabel: string,

  /**
   * Whether or not the page can be also linked with "/" or "/index".
   *
   * @see `Navigation["page"]`
   */
  index?: boolean,

  /**
   * The page provider.
   */
  content(): JSX.Element,
}
