import { useNavigation } from "Application/contexts";
import { Pages } from "Application/types";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function Navigation(
    { pages }: { pages: Pages }
  ): JSX.Element
{
  const { t } = useTranslation();
  const { navigation, setNavigation } = useNavigation();

  const page = useMemo(
    () => (
      pages.find(
        ({ path }) => (
          path.trim().toLowerCase() == navigation?.page
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
    <div>
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
        </ul>
      </nav>
      <pre>
        {JSON.stringify(navigation, null, 2)}
      </pre>
    </div>
  )
}
