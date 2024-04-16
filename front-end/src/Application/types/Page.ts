
export type Pages = Page[];

export interface Page {

  path: string,

  /**
   * Optional label along with the page (mainly used to be displayed in the
   * `<title>` HTML tag along with the application title).
   */
  i18nLabel: string,

  /**
   * The page provider.
   */
  content(): JSX.Element,
}
