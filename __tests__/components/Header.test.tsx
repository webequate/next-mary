import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const socialLink = { name: "twitter", url: "https://twitter.com/test" };

describe("Header", () => {
  it("renders all navigation links", () => {
    render(<Header socialLink={socialLink} />);
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Books" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Articles" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Online Work" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contact Me" }).length).toBeGreaterThan(0);
  });

  it("marks the Home link active when pathname is '/'", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Header socialLink={socialLink} />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.some((l) => l.classList.contains("active"))).toBe(true);
  });

  it("marks the About link active when pathname is '/about'", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(<Header socialLink={socialLink} />);
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks.some((l) => l.classList.contains("active"))).toBe(true);
  });

  it("marks Home active when pathname starts with /featured", () => {
    vi.mocked(usePathname).mockReturnValue("/featured/123");
    render(<Header socialLink={socialLink} />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.some((l) => l.classList.contains("active"))).toBe(true);
  });

  it("does not mark Home active when pathname is '/about'", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(<Header socialLink={socialLink} />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.every((l) => !l.classList.contains("active"))).toBe(true);
  });

  it("renders the hamburger button", () => {
    render(<Header socialLink={socialLink} />);
    expect(
      screen.getByRole("button", { name: "Hamburger Menu" })
    ).toBeInTheDocument();
  });

  it("toggles mobile menu visibility when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Header socialLink={socialLink} />);
    const menuDiv = document.querySelector(".nav-mobile");
    expect(menuDiv?.classList.contains("show")).toBe(false);

    await user.click(screen.getByRole("button", { name: "Hamburger Menu" }));
    expect(document.querySelector(".nav-mobile")?.classList.contains("show")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Hamburger Menu" }));
    expect(document.querySelector(".nav-mobile")?.classList.contains("show")).toBe(false);
  });
});
