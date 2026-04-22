import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const socialLinks = [
  { name: "twitter", url: "https://twitter.com/test" },
  { name: "linkedin", url: "https://linkedin.com/in/test" },
];

describe("Footer", () => {
  it("renders all navigation links", () => {
    render(<Footer name="Mary J Johnson" socialLinks={socialLinks} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Books" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Articles" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Online Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("marks Books link active when pathname is '/books'", () => {
    vi.mocked(usePathname).mockReturnValue("/books");
    render(<Footer name="Mary J Johnson" socialLinks={socialLinks} />);
    expect(
      screen.getByRole("link", { name: "Books" }).classList.contains("active")
    ).toBe(true);
  });

  it("marks Home active when pathname starts with /featured", () => {
    vi.mocked(usePathname).mockReturnValue("/featured/abc");
    render(<Footer name="Mary J Johnson" socialLinks={socialLinks} />);
    expect(
      screen.getByRole("link", { name: "Home" }).classList.contains("active")
    ).toBe(true);
  });

  it("does not mark About active when pathname is '/books'", () => {
    vi.mocked(usePathname).mockReturnValue("/books");
    render(<Footer name="Mary J Johnson" socialLinks={socialLinks} />);
    expect(
      screen.getByRole("link", { name: "About" }).classList.contains("active")
    ).toBe(false);
  });

  it("renders the provided name in copyright", () => {
    render(<Footer name="Mary J Johnson" socialLinks={socialLinks} />);
    expect(screen.getByText(/Mary J Johnson/)).toBeInTheDocument();
  });
});
