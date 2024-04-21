import { useTranslation } from "react-i18next";

import { Language } from "Application/locales";
import { Page, Pages } from "Application/types";
import { useNavigation } from "Application/hooks";

import "./Header.scss";

export function Header(
    { pages, page }: {
      pages: Pages,
      page?: Page,
    }
  ): JSX.Element
{
  const { t } = useTranslation();
  const { setNavigation } = useNavigation();

  return (
    <header id="header">
      <nav>
        <ul>
          {pages.map(
            ({ path, i18nLabel }) => (
              <li
                key={path}
                className={
                  path == page?.path
                    ? "selected"
                    : undefined
                }
              >
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
    </header>
  );
}
