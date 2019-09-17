import { render } from "@testing-library/react";
import React from "react";
import Nl2Br from "./Nl2Br";

describe("Nl2Br", (): void => {
  it("renders text without newlines", (): void => {
    const { container } = render(<Nl2Br text="A nice text" />);
    expect(container).toMatchSnapshot();
  });

  it("renders text with newlines", (): void => {
    const { container } = render(
      <Nl2Br text={"A nice text\nwith even more text"} />,
    );
    expect(container).toMatchSnapshot();
  });
});
