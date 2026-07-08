import { Asterisk } from "lucide-react";

interface Props {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
}

export function Marquee({ items, reverse, slow }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-6 mask-fade-x">
      <div
        className={`flex w-max items-center gap-12 ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-3xl tracking-tight text-foreground/80 sm:text-4xl md:text-5xl">
              {item}
            </span>
            <Asterisk className="size-5 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
