import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const mobileQuery = "(max-width: 580px)";

/** Native scrolling preserves touch gestures and access to every item without JavaScript. */
export function useMobileCarousel<T extends HTMLElement = HTMLDivElement>(
  count: number,
  resetKey = "",
) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<T>(null);
  const goTo = useCallback((index: number, smooth = true) => {
    const viewport = viewportRef.current;
    if (!viewport || !window.matchMedia(mobileQuery).matches) return;
    const cards = Array.from(viewport.children) as HTMLElement[];
    const target = cards[(index + cards.length) % cards.length];
    if (!target) return;
    viewport.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior:
        smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "smooth"
          : "instant",
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let inView = false;
    let current = 0;
    const sync = () => {
      const cards = Array.from(viewport.children) as HTMLElement[];
      current = cards.reduce(
        (nearest, card, index) =>
          Math.abs(
            card.offsetLeft - cards[0].offsetLeft - viewport.scrollLeft,
          ) <
          Math.abs(
            cards[nearest].offsetLeft -
              cards[0].offsetLeft -
              viewport.scrollLeft,
          )
            ? index
            : nearest,
        0,
      );
      setActive(current);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(viewport);
    viewport.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    const timer = window.setInterval(() => {
      if (
        !paused &&
        inView &&
        !document.hidden &&
        count > 1 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !viewport.querySelector("details[open]")
      )
        goTo(current + 1);
    }, 6500);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.clearInterval(timer);
    };
  }, [paused, resetKey, count, goTo]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (!window.matchMedia(mobileQuery).matches) return;
    event.preventDefault();
    setPaused(true);
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  };
  return {
    active,
    setActive,
    paused,
    setPaused,
    viewportRef,
    goTo,
    onKeyDown,
    interactionProps: {
      onPointerDown: () => setPaused(true),
      onFocusCapture: () => setPaused(true),
      onKeyDown,
    },
  };
}
