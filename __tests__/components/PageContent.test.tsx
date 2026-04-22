import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { usePathname } from "next/navigation";
import PageContent from "@/components/PageContent";

describe("PageContent", () => {
  it("renders children", () => {
    render(<PageContent><p>Hello World</p></PageContent>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies the page-content class", () => {
    const { container } = render(<PageContent>content</PageContent>);
    expect(container.firstChild).toHaveClass("page-content");
  });

  it("applies extra className when provided", () => {
    const { container } = render(
      <PageContent className="extra-class">content</PageContent>
    );
    expect(container.firstChild).toHaveClass("extra-class");
  });

  it("still renders page-content after a pathname change", () => {
    const mockPathname = vi.mocked(usePathname);
    mockPathname.mockReturnValue("/about");
    const { rerender, container } = render(
      <PageContent>content</PageContent>
    );
    expect(container.firstChild).toHaveClass("page-content");

    mockPathname.mockReturnValue("/books");
    rerender(<PageContent>content</PageContent>);
    expect(container.firstChild).toHaveClass("page-content");
  });
});
