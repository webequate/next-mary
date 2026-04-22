import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

describe("useThemeSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark", "light");
    vi.clearAllMocks();
  });

  it("defaults to 'dark' theme with 'light' activeTheme", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    expect(activeTheme).toBe("light");
  });

  it("restores saved theme from localStorage on mount", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    expect(activeTheme).toBe("dark");
  });

  it("only reads localStorage once on mount (Effect 1 does not re-run)", () => {
    const getSpy = vi.spyOn(Storage.prototype, "getItem");
    const { result } = renderHook(() => useThemeSwitcher());

    act(() => {
      result.current[1]("light");
    });
    act(() => {
      result.current[1]("dark");
    });

    const themeGetCalls = getSpy.mock.calls.filter(([key]) => key === "theme");
    expect(themeGetCalls).toHaveLength(1);
  });

  it("calling setTheme toggles activeTheme", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    expect(result.current[0]).toBe("light");

    act(() => {
      result.current[1]("light");
    });
    expect(result.current[0]).toBe("dark");
  });

  it("adds current theme class to documentElement", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => {
      result.current[1]("light");
    });
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("removes old theme class when theme changes", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => {
      result.current[1]("light");
    });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("writes theme to localStorage when theme changes", () => {
    const { result } = renderHook(() => useThemeSwitcher());

    act(() => {
      result.current[1]("light");
    });
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
