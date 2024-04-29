import { NavLink } from "react-router-dom";
import { Language } from "Application/locales";
import { LogUpdates } from "Application/utils";

import "./Header.scss";

const routes = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/records",
    label: "Records",
  },
  {
    route: "/messages",
    label: "Messages",
  },
  {
    route: "/settings",
    label: "Settings",
  },
];

export function Header(): JSX.Element {
  return (
    <LogUpdates
      as={"header"}
      id={"header"}
    >
      <div>Header</div>

      <nav>
        <ul>
          {routes.map(
            ({ route, label }) => (
              <li key={route}>
                <NavLink
                  to={route}
                  className={
                    ({ isActive }: any) => {
                      return isActive ? "active" : null
                    }
                  }
                >
                  {label}
                </NavLink>
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
    </LogUpdates>
  );
}
