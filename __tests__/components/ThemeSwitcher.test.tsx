import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({ theme: "light", setTheme: mockSetTheme })),
}));

describe("ThemeSwitcher", () => {
  it("renders the switcher div after mount", () => {
    const { container } = render(<ThemeSwitcher />);
    expect(container.querySelector("[class*='cursor-pointer']")).toBeInTheDocument();
  });

  it("switches to dark when current theme is light", async () => {
    const { useTheme } = await import("next-themes");
    vi.mocked(useTheme).mockReturnValue({ theme: "light", setTheme: mockSetTheme, resolvedTheme: "light", themes: [], systemTheme: undefined, forcedTheme: undefined });

    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    const switcher = document.querySelector("[class*='cursor-pointer']") as HTMLElement;
    await user.click(switcher);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("switches to light when current theme is dark", async () => {
    const { useTheme } = await import("next-themes");
    vi.mocked(useTheme).mockReturnValue({ theme: "dark", setTheme: mockSetTheme, resolvedTheme: "dark", themes: [], systemTheme: undefined, forcedTheme: undefined });

    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    const switcher = document.querySelector("[class*='cursor-pointer']") as HTMLElement;
    await user.click(switcher);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
