
# Dashboard Front-End

## Commands

## Notes

- `npm audit fix --force`
- `react-scripts eject`

## Notes

### Manifest

`manifest.json` provides metadata used when your web app is installed on a
user's mobile device or desktop.

See https://developers.google.com/web/fundamentals/web-app-manifest/

### Atomic Design

Source: [Atomic Design with React Components][react-atomic]

[react-atomic]: https://www.linkedin.com/pulse/atomic-design-react-components-kartik-budhraja

#### Understanding Atomic Design: The Foundation

Atomic Design, is a methodology that breaks down user interfaces into fundamental
building blocks. These blocks are categorized into five distinct levels: atoms,
molecules, organisms, templates, and pages.

- **Atoms**:

  Atoms represent the basic building blocks of a UI, such as buttons, inputs,
  and labels. These are elemental components that cannot be broken down further
  without losing their meaning.

- **Molecules**:

  Molecules are combinations of atoms that form more complex components. For
  instance, a search bar comprising an input field and a button represents a
  molecule.

- **Organisms**:

  Organisms are a combination of molecules and/or atoms that form distinct
  sections of a user interface, like a header or a sidebar.

- **Templates**:

  Templates provide context to organisms, defining the overall layout of a page
  without containing specific content. They act as placeholders for the dynamic
  content to be inserted later.

- **Pages**:

  Pages are specific instances where templates are populated with real content,
  creating a unique and functional user interface.

#### Integrating Atomic Design with React Components:

When Atomic Design principles are applied to React components, the development
process becomes more modular and manageable.

- **Atoms as React Components**:

  In the context of React, atoms are simple components like buttons or input
  fields. These are the basic elements encapsulated into reusable React
  components.

  ```js
  // ButtonAtom.js
  import React from 'react';

  const ButtonAtom = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>;
  };

  export default ButtonAtom;
  ```

- **Molecules and Organisms as Composite Components**:

  Molecules are combinations of atoms, and organisms are more complex components
  made up of molecules and/or atoms. Let's create a molecule and an organism:

  ```js
  // SearchMolecule.js
  import React from 'react';
  import ButtonAtom from './ButtonAtom';

  const SearchMolecule = ({ onSearch }) => {
    return (
      <div>
        <input type="text" placeholder="Search..." />
        <ButtonAtom label="Search" onClick={onSearch} />
      </div>
    );
  };

  export default SearchMolecule;
  ```

  ```js
  // LoginFormOrganism.js
  import React from 'react';
  import InputAtom from './InputAtom';
  import ButtonAtom from './ButtonAtom';

  const LoginFormOrganism = ({ onLogin }) => {
    return (
      <div>
        <InputAtom type="text" placeholder="Username" />
        <InputAtom type="password" placeholder="Password" />
        <ButtonAtom label="Login" onClick={onLogin} />
      </div>
    );
  };

  export default LoginFormOrganism;
  ```

- **Templates and Pages as Container Components**:

  Templates and pages are container components that structure the layout and
  populate it with specific content. Here's an example of a template and a
  corresponding page:

  ```js
  // AuthTemplate.js
  import React from 'react';

  const AuthTemplate = ({ children }) => {
    return (
      <div className="auth-container">
        <div className="auth-form">{children}</div>
      </div>
    );
  };

  export default AuthTemplate;
  ```

  ```js
  // LoginPage.js
  import React from 'react';
  import AuthTemplate from './AuthTemplate';
  import LoginFormOrganism from './LoginFormOrganism';

  const LoginPage = () => {
    const handleLogin = () => {
      // Logic for handling login
    };

    return (
      <AuthTemplate>
        <h2>Login</h2>
        <LoginFormOrganism onLogin={handleLogin} />
      </AuthTemplate>
    );
  };

  export default LoginPage;
  ```

  In this example, AuthTemplate serves as a template defining the overall
  structure, and LoginPage represents a specific instance (page) where the
  template is populated with the login form organism.
