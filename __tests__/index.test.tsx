import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Página Inicial", () => {
  it("Test sample - Testing the initial Next App Page", () => {
    render(<Home />);
    const heading = screen.getByText(/Get started by editing/i);
    expect(heading).toBeInTheDocument();
  });
});
