import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";   // actual applied theme after resolving "system"
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/** Returns initial theme from localStorage or defaults to "system" */
export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) ?? "system";
};

/** Hook that manages theme state and syncs with <html> class + localStorage */
export const useThemeState = (): ThemeContextType => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Detect OS preference
  const getSystemTheme = (): "light" | "dark" =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? getSystemTheme() : theme;

  // Apply class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  // Listen for system preference changes when theme === "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setThemeState("system"); // re-trigger effect
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, resolvedTheme, setTheme, toggleTheme };
};
