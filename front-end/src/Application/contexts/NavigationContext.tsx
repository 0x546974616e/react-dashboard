import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Navigation } from "Application/types";

interface NavigationContext {
  navigation: Navigation | null,
  setNavigation(navigation: Navigation | string): void,
}

const NavigationContext = (
  createContext<NavigationContext>({
    setNavigation: () => {},
    navigation: null,
  })
);

export function useNavigation(): NavigationContext {
  return useContext(NavigationContext);
}

export function NavigationProvider(
    props: { children?: React.ReactNode }
  ): React.ReactElement
{
  const [ navigation, setNavigation ] = (
    useState<Navigation | null>(
      useMemo(Navigation.retrieveState, [])
    )
  );

  useEffect(
    () => {
      function urlChanged(event?: PopStateEvent) {
        const navigation = Navigation.retrieveState(event);
        setNavigation(navigation);
      }

      window.addEventListener("popstate", urlChanged);
      return () => window.removeEventListener("popstate", urlChanged);
    }, []
  );

  const value = useMemo(
    (): NavigationContext => ({
      navigation,
      setNavigation(current: Navigation | string) {
        if (typeof current == "string") {
          current = {
            page: current.trim().toLowerCase(),
            parameters: {},
          };
        }
        else {
          const { page } = current;
          current.page = page.trim().toLowerCase();
        }

        if (!navigation || !Navigation.equal(navigation, current)) {
          Navigation.pushState(current);
          setNavigation(current);
        }
      },
    }),
    [ navigation, setNavigation ]
  );

  return (
    <NavigationContext.Provider value={value}>
      {props.children}
    </NavigationContext.Provider>
  );
}
