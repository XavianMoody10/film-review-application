import App from "./App";

const { render, screen } = require("@testing-library/react");

test("Should get hello world", () => {
  render(<App></App>);
  screen.getByText("Hello world!");
});
