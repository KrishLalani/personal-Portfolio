import { useCallback, useEffect, useState } from "react";
export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "portfolio-theme";
function savedTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : "system";
  } catch {
    return "system";
  }
}
function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  useEffect(() => {
    const sync = () => {
      const current = savedTheme();
      setThemeState(current);
      applyTheme(current);
    };
    sync();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
    setThemeState(next);
    applyTheme(next);
  }, []);
  const toggle = useCallback(
    () =>
      setTheme(
        document.documentElement.classList.contains("dark") ? "light" : "dark",
      ),
    [setTheme],
  );
  return { theme, setTheme, toggle };
}
