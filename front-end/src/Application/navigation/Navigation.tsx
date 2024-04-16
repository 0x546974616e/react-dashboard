import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useNavigation } from "Application/hooks";
import { Language } from "Application/locales";
import { Pages } from "Application/types";

import { LazyLoad } from "./LazyLoad";

export function Navigation(
    { pages }: { pages: Pages }
  ): JSX.Element
{
  const { t } = useTranslation();
  const { navigation, setNavigation } = useNavigation();

  const page = useMemo(
    () => (
      pages.find(
        ({ path, index }) => (
          // First check if the page can be the "index" one.
          ((!navigation || navigation.page == "index") && index)
          || path.trim().toLowerCase() == navigation?.page
        )
      )
    ),
    [ navigation?.page, pages ]
  );

  useEffect(
    () => {
      if (!page) {
        // When the navigation changed, the document title must be reset.
        document.title = `${process.env.REACT_APP_TITLE}`;
      }
      else {
        let label = t(page.i18nLabel, "/");
        // https://en.wikipedia.org/wiki/Dash
        document.title = (
          (label = label?.trim()) && label != "/"
            ? `${process.env.REACT_APP_TITLE} – ${label}`
            : `${process.env.REACT_APP_TITLE}`
        );
      }
    },
    [ t, page ]
  );

  return (
    <div id="navigation">
      <nav>
        <ul>
          {pages.map(
            ({ path, i18nLabel }) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  onClick={
                    (event) => {
                      // Prevent the link from being opened to stay on the SPA but
                      // keep the href as a failover/fallback if the `history`
                      // API is not supported by the navigator.
                      event.preventDefault();
                      setNavigation({
                        parameters: {},
                        page: path,
                      });
                    }
                  }
                >
                  {t(i18nLabel)}
                </a>
                {path == page?.path ? "CURRENT" : ""}
              </li>
            )
          )}
          {[ Language.French, Language.English ].map(
            (language) => (
              <li
                key={language.id}
                onClick={() => language.set()}
              >
                {language.id}
              </li>
            )
          )}
        </ul>
      </nav>
      <pre>
        {JSON.stringify(navigation, null, 2)}
      </pre>
      <div id="pages">
        {pages.map(
          ({ path, content }) => (
            <LazyLoad
              key={path}
              content={content}
              value={page?.path}
              when={path}
            />
          )
        )}

        <LazyLoad
          content={() => <div>Error</div>}
          value={page?.path}
          when={undefined}
        />
      </div>
    </div>
  )
}
