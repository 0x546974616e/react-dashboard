import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useNavigation } from "./useNavigation";
import { LazyLoad } from "./LazyLoad";
import { Header } from "./Header";
import { Pages } from "./Page";

import "./Navigation.scss";

export function Navigation(
    { pages }: { pages: Pages }
  ): JSX.Element
{
  const { t } = useTranslation();
  const { navigation } = useNavigation();

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
      <Header pages={pages} page={page}/>
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
