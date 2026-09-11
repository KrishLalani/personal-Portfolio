import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { KeyboardEventHandler } from "react";

type Props = {
  carousel: {
    active: number;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    goTo: (index: number) => void;
    onKeyDown: KeyboardEventHandler<HTMLElement>;
  };
  count: number;
  itemLabel: string;
  viewportId: string;
};

export function MobileCarouselControls({
  carousel,
  count,
  itemLabel,
  viewportId,
}: Props) {
  const { active, paused, setPaused, goTo, onKeyDown } = carousel;
  return (
    <div
      className="mobile-carousel-controls"
      role="group"
      aria-label={`${itemLabel} navigation`}
      onKeyDown={onKeyDown}
    >
      <span
        className="mobile-carousel-count"
        aria-live={paused ? "polite" : "off"}
      >
        {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>
      <span className="mobile-carousel-hint">
        {count > 1 ? "Swipe to explore" : "All results shown"}
      </span>
      {count > 1 && (
        <>
          <button
            type="button"
            className="mobile-carousel-autoplay"
            aria-controls={viewportId}
            aria-label={`${paused ? "Start" : "Pause"} automatic ${itemLabel} rotation`}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            type="button"
            aria-label={`Previous ${itemLabel}`}
            aria-controls={viewportId}
            onClick={() => {
              setPaused(true);
              goTo(active - 1);
            }}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            aria-label={`Next ${itemLabel}`}
            aria-controls={viewportId}
            onClick={() => {
              setPaused(true);
              goTo(active + 1);
            }}
          >
            <ChevronRight size={19} />
          </button>
        </>
      )}
    </div>
  );
}
