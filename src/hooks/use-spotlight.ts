import { useCallback } from "react";

/**
 * Tracks the pointer inside an element and writes --mx / --my custom properties
 * so a CSS radial gradient can follow it. Pair with the `.spotlight` class.
 */
export function useSpotlight() {
  return useCallback((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}
