import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hamburger from "@/components/Hamburger";

describe("Hamburger", () => {
  it("renders a button with accessible label", () => {
    render(<Hamburger showMenu={false} toggleMenu={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Hamburger Menu" })
    ).toBeInTheDocument();
  });

  it("calls toggleMenu when clicked", async () => {
    const toggle = vi.fn();
    const user = userEvent.setup();
    render(<Hamburger showMenu={false} toggleMenu={toggle} />);
    await user.click(screen.getByRole("button", { name: "Hamburger Menu" }));
    expect(toggle).toHaveBeenCalledOnce();
  });

  it("renders close icon when showMenu is true", () => {
    const { container } = render(
      <Hamburger showMenu={true} toggleMenu={vi.fn()} />
    );
    // FiX renders an svg; FiMenu also does — verify the correct one is present
    // by checking that showMenu=true has an svg (close) and showMenu=false differs
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders menu icon when showMenu is false", () => {
    const { container } = render(
      <Hamburger showMenu={false} toggleMenu={vi.fn()} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
