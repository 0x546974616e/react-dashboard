import { render, screen } from '@testing-library/react';

import { Text } from "./Text";

test(
  "Renders react text.",
  function() {
    render(<Text as={"span"}>Dada</Text>);
    const text = screen.getByText(/Dada/i);
    expect(text).toBeInTheDocument();
  }
);
