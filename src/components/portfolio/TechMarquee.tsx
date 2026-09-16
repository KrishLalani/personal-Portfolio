import { Asterisk } from "lucide-react";
import { skills } from "@/lib/portfolio-data";

/**
 * Infinite horizontal strip of the technologies listed in the skills data.
 * The row is duplicated so the -50% translate loops seamlessly; hovering pauses it.
 */
export function TechMarquee() {
  const items = skills.flatMap((group) => group.items);
  const half = [...items];

  return (
    <div
      className="marquee-strip mask-fade-x"
      aria-hidden="true"
      role="presentation"
    >
      <div className="row animate-marquee">
        {[0, 1].map((copy) => (
          <span key={copy}>
            {half.map((item) => (
              <span key={`${copy}-${item}`}>
                {item}
                <Asterisk size={15} strokeWidth={1.5} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
