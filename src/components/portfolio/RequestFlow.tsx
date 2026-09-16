import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated request pipeline for the backend discipline.
 *
 * An SVG track carries packets through client → API → auth → database, and a
 * rolling log prints synthetic request lines with status codes and latencies.
 * Everything is generated in the browser; no data is fetched.
 */

const STAGES = [
  { key: "client", label: "Client", detail: "HTTPS" },
  { key: "api", label: "REST API", detail: "Express" },
  { key: "auth", label: "Auth", detail: "JWT" },
  { key: "db", label: "Database", detail: "PostgreSQL" },
];

const ROUTES = [
  "GET  /api/v1/placements",
  "POST /api/v1/auth/session",
  "GET  /api/v1/students/:id",
  "PATCH /api/v1/exams/:id",
  "POST /api/v1/clubs/events",
  "GET  /api/v1/health",
];

interface LogLine {
  id: number;
  route: string;
  status: number;
  ms: number;
}

export function RequestFlow() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<LogLine[]>([]);
  const [served, setServed] = useState(1284);
  const [stage, setStage] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      setLines([
        { id: 1, route: ROUTES[0], status: 200, ms: 12 },
        { id: 2, route: ROUTES[1], status: 201, ms: 28 },
        { id: 3, route: ROUTES[2], status: 200, ms: 9 },
      ]);
      return;
    }
    const interval = window.setInterval(() => {
      idRef.current += 1;
      const roll = Math.random();
      const status = roll > 0.94 ? 401 : roll > 0.88 ? 201 : 200;
      const next: LogLine = {
        id: idRef.current,
        route: ROUTES[Math.floor(Math.random() * ROUTES.length)],
        status,
        ms: Math.round(6 + Math.random() * 46),
      };
      setLines((current) => [next, ...current].slice(0, 4));
      setServed((count) => count + 1);
    }, 1400);

    const stepper = window.setInterval(
      () => setStage((value) => (value + 1) % STAGES.length),
      900,
    );

    return () => {
      window.clearInterval(interval);
      window.clearInterval(stepper);
    };
  }, [reduce]);

  return (
    <div
      className="reqflow"
      aria-label="Illustration of a REST request travelling from client to database. Decorative."
    >
      <div className="reqflow-track" aria-hidden="true">
        <svg viewBox="0 0 420 96" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rf-line" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.7" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.15"
              />
            </linearGradient>
          </defs>
          <path
            d="M34 48 H386"
            stroke="url(#rf-line)"
            strokeWidth="1.5"
            fill="none"
          />
          {STAGES.map((item, index) => {
            const x = 34 + index * ((386 - 34) / (STAGES.length - 1));
            const active = index === stage;
            return (
              <g key={item.key}>
                <circle
                  cx={x}
                  cy={48}
                  r={active ? 15 : 11}
                  fill="var(--card)"
                  stroke="var(--primary)"
                  strokeWidth={active ? 1.6 : 1}
                  opacity={active ? 1 : 0.5}
                  style={{ transition: "all .45s cubic-bezier(.16,1,.3,1)" }}
                />
                <circle
                  cx={x}
                  cy={48}
                  r={4}
                  fill="var(--primary)"
                  opacity={active ? 1 : 0.35}
                />
                <text
                  x={x}
                  y={22}
                  textAnchor="middle"
                  className="reqflow-label"
                  opacity={active ? 1 : 0.55}
                >
                  {item.label}
                </text>
                <text
                  x={x}
                  y={78}
                  textAnchor="middle"
                  className="reqflow-detail"
                  opacity={active ? 0.9 : 0.4}
                >
                  {item.detail}
                </text>
              </g>
            );
          })}
          {!reduce && (
            <circle r="3.5" fill="var(--primary)">
              <animateMotion
                dur="3.6s"
                repeatCount="indefinite"
                path="M34 48 H386"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.55 1"
              />
            </circle>
          )}
        </svg>
      </div>

      <div className="reqflow-log" role="presentation" aria-hidden="true">
        <div className="reqflow-log-top">
          <span>access log</span>
          <span>{served.toLocaleString("en-US")} served</span>
        </div>
        <ul>
          {lines.map((line) => (
            <li key={line.id}>
              <code>{line.route}</code>
              <em data-status={line.status >= 400 ? "err" : "ok"}>
                {line.status}
              </em>
              <i>{line.ms}ms</i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
