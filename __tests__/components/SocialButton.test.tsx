import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialButton from "@/components/SocialButton";

describe("SocialButton", () => {
  it("renders a link with the provided URL", () => {
    render(<SocialButton name="twitter" url="https://twitter.com/test" />);
    expect(screen.getByRole("link", { name: "twitter" })).toHaveAttribute(
      "href",
      "https://twitter.com/test"
    );
  });

  it("renders a link with target _blank", () => {
    render(<SocialButton name="linkedin" url="https://linkedin.com/in/test" />);
    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  it.each([
    "facebook",
    "github",
    "instagram",
    "linkedin",
    "twitter",
    "youtube",
  ])("renders an icon for %s", (name) => {
    const { container } = render(
      <SocialButton name={name} url={`https://example.com/${name}`} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("falls back to a Facebook icon for unknown names", () => {
    const { container } = render(
      <SocialButton name="unknown" url="https://example.com" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
