import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, ScanLine } from "lucide-react";

/**
 * A procedurally rendered inference visualisation.
 *
 * Nothing here is a video or a recording: every frame is drawn on a 2D canvas.
 * Synthetic targets drift through a generated scene, a scan bar sweeps the
 * frame, and targets the bar has passed get a tracked bounding box with a class
 * label and a confidence score. Two presets mirror the real work: pond
 * surveillance (PondGuard) and industrial board inspection.
 */

type Preset = "pond" | "inspect";

interface TargetClass {
  name: string;
  hue: number;
}

const PRESETS: Record<
  Preset,
  {
    label: string;
    model: string;
    classes: TargetClass[];
    count: number;
    scene: "water" | "board";
  }
> = {
  pond: {
    label: "Pond surveillance",
    model: "yolo11n · 640×640",
    classes: [
      { name: "heron", hue: 160 },
      { name: "duck", hue: 196 },
      { name: "gull", hue: 132 },
    ],
    count: 4,
    scene: "water",
  },
  inspect: {
    label: "Board inspection",
    model: "yolo11s · 1280×1280",
    classes: [
      { name: "solder-void", hue: 42 },
      { name: "hairline-crack", hue: 8 },
      { name: "contaminant", hue: 280 },
    ],
    count: 5,
    scene: "board",
  },
};

interface Target {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  cls: TargetClass;
  conf: number;
  /** 0 → 1 as the box locks on after the scan bar passes. */
  lock: number;
  phase: number;
  id: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function DetectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<Preset>("pond");
  const [running, setRunning] = useState(true);
  const [readout, setReadout] = useState({ fps: 0, ms: 0, objects: 0 });

  // Refs the animation loop reads without re-subscribing.
  const runningRef = useRef(running);
  const presetRef = useRef(preset);
  const pointerRef = useRef<{ x: number; y: number; on: boolean }>({
    x: 0,
    y: 0,
    on: false,
  });
  runningRef.current = running;
  presetRef.current = preset;

  const config = PRESETS[preset];

  const handlePointer = useCallback((event: React.PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      on: true,
    };
  }, []);

  const clearPointer = useCallback(() => {
    pointerRef.current.on = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let targets: Target[] = [];
    let seed = 0;

    const spawn = (cfg: (typeof PRESETS)[Preset], id: number): Target => {
      const cls = cfg.classes[Math.floor(Math.random() * cfg.classes.length)];
      const size = cfg.scene === "water" ? rand(0.07, 0.13) : rand(0.05, 0.1);
      return {
        x: rand(0.08, 0.92),
        y: rand(0.15, 0.85),
        vx: rand(-0.035, 0.035) || 0.02,
        vy: rand(-0.018, 0.018),
        w: size,
        h: size * rand(0.7, 1.1),
        cls,
        conf: rand(0.78, 0.98),
        lock: 0,
        phase: rand(0, Math.PI * 2),
        id,
      };
    };

    const build = () => {
      const cfg = PRESETS[presetRef.current];
      targets = Array.from({ length: cfg.count }, () => spawn(cfg, seed++));
    };
    build();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = width * (10 / 16);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    // Pause entirely when scrolled out of view.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    // Read from the wrapper, not :root, so the palette can be scoped by CSS.
    // Inside the fixed-dark instrument panel the canvas must stay light-on-dark
    // even while the rest of the page is in light mode.
    const readVar = (name: string, fallback: string) =>
      getComputedStyle(wrap).getPropertyValue(name).trim() || fallback;

    let scan = 0;
    let last = performance.now();
    let frames = 0;
    let fpsClock = 0;
    let raf = 0;
    let statClock = 0;

    const drawWaterScene = (t: number, ink: string) => {
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, `color-mix(in oklab, ${ink} 6%, transparent)`);
      ctx.restore();
      // Horizon band
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      for (let i = 1; i < 7; i++) {
        const y = height * (0.22 + i * 0.11);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const wave =
            Math.sin(x * 0.012 + t * 0.0009 + i * 0.7) * (2 + i * 0.55) +
            Math.sin(x * 0.031 - t * 0.0013 + i) * 1.2;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      void grad;
    };

    const drawBoardScene = (t: number, ink: string) => {
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      const step = Math.max(26, width / 22);
      for (let x = step / 2; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = step / 2; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Trace routing: a few right-angle paths, like copper on a board.
      ctx.globalAlpha = 0.26;
      ctx.lineWidth = 1.6;
      for (let i = 0; i < 5; i++) {
        const y = height * (0.16 + i * 0.17);
        const bend = width * (0.28 + ((i * 0.13 + t * 0.00002) % 0.4));
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(bend, y);
        ctx.lineTo(bend + 22, y + 22);
        ctx.lineTo(width, y + 22);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bend, y, 3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const drawTarget = (target: Target, t: number, ink: string) => {
      const px = target.x * width;
      const py = target.y * height;
      const bw = target.w * width;
      const bh = target.h * height;
      const accent = `oklch(0.72 0.16 ${target.cls.hue})`;

      // The object itself: a soft blob that breathes, so the box has a subject.
      ctx.save();
      ctx.globalAlpha = 0.55;
      const blob = ctx.createRadialGradient(px, py, 1, px, py, bw * 0.55);
      blob.addColorStop(0, accent);
      blob.addColorStop(1, "transparent");
      ctx.fillStyle = blob;
      const pulse = 1 + Math.sin(t * 0.003 + target.phase) * 0.07;
      ctx.beginPath();
      ctx.ellipse(
        px,
        py,
        bw * 0.3 * pulse,
        bh * 0.3 * pulse,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      if (target.lock <= 0.01) return;

      const ease = 1 - Math.pow(1 - Math.min(1, target.lock), 3);
      const x = px - bw / 2;
      const y = py - bh / 2;
      // Box grows outward from the centre as confidence settles.
      const gw = bw * (0.55 + 0.45 * ease);
      const gh = bh * (0.55 + 0.45 * ease);
      const gx = px - gw / 2;
      const gy = py - gh / 2;

      ctx.save();
      ctx.globalAlpha = ease;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([]);
      // Corner brackets rather than a full rectangle: reads as a tracker.
      const c = Math.min(gw, gh) * 0.28;
      const corners: [number, number, number, number][] = [
        [gx, gy, 1, 1],
        [gx + gw, gy, -1, 1],
        [gx, gy + gh, 1, -1],
        [gx + gw, gy + gh, -1, -1],
      ];
      for (const [cx, cy, sx, sy] of corners) {
        ctx.beginPath();
        ctx.moveTo(cx + sx * c, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + sy * c);
        ctx.stroke();
      }
      ctx.globalAlpha = ease * 0.1;
      ctx.fillStyle = accent;
      ctx.fillRect(gx, gy, gw, gh);

      // Label chip
      if (ease > 0.55) {
        const text = `${target.cls.name} ${(target.conf * 100).toFixed(0)}%`;
        ctx.font =
          "500 10px ui-monospace, SFMono-Regular, 'JetBrains Mono', monospace";
        const tw = ctx.measureText(text).width;
        const chipH = 16;
        const chipW = tw + 14;
        // Keep the chip inside the frame on every edge.
        const chipX = Math.min(Math.max(2, gx), width - chipW - 2);
        const chipY =
          gy - chipH - 4 < 2
            ? Math.min(gy + gh + 4, height - chipH - 2)
            : gy - chipH - 4;
        ctx.globalAlpha = ease;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.roundRect(chipX, chipY, chipW, chipH, 4);
        ctx.fill();
        ctx.fillStyle = "#0d1512";
        ctx.fillText(text, chipX + 7, chipY + 11.5);
      }
      ctx.restore();
      void ink;
      void x;
      void y;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - last);
      last = now;
      if (!visible) return;

      const cfg = PRESETS[presetRef.current];
      const active = runningRef.current && !reduce;
      const ink = readVar("--det-ink", "#172b25");
      const primary = readVar("--det-accent", "#23745a");

      ctx.clearRect(0, 0, width, height);

      if (cfg.scene === "water") drawWaterScene(now, ink);
      else drawBoardScene(now, ink);

      // Move targets and bounce them inside the frame.
      if (active) {
        for (const target of targets) {
          target.x += (target.vx * dt) / 1000;
          target.y += (target.vy * dt) / 1000;
          if (target.x < 0.08 || target.x > 0.92) target.vx *= -1;
          if (target.y < 0.14 || target.y > 0.86) target.vy *= -1;
          target.x = Math.min(0.92, Math.max(0.08, target.x));
          target.y = Math.min(0.86, Math.max(0.14, target.y));
        }
        scan = (scan + dt / 2600) % 1;
      }

      // The scan bar "confirms" a target once it has swept past it.
      for (const target of targets) {
        const passed = Math.abs(scan - target.y) < 0.14;
        const hovered =
          pointerRef.current.on &&
          Math.abs(pointerRef.current.x - target.x) < target.w &&
          Math.abs(pointerRef.current.y - target.y) < target.h;
        const want = passed || hovered || !active ? 1 : 0.82;
        target.lock += (want - target.lock) * Math.min(1, dt / 220);
      }

      // Scan bar
      if (active) {
        const sy = scan * height;
        const bar = ctx.createLinearGradient(0, sy - 34, 0, sy + 6);
        bar.addColorStop(0, "transparent");
        bar.addColorStop(1, primary);
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = bar;
        ctx.fillRect(0, sy - 34, width, 40);
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = primary;
        ctx.fillRect(0, sy, width, 1);
        ctx.restore();
      }

      for (const target of targets) drawTarget(target, now, ink);

      // Region-of-interest reticle under the pointer.
      if (pointerRef.current.on) {
        const px = pointerRef.current.x * width;
        const py = pointerRef.current.y * height;
        ctx.save();
        ctx.strokeStyle = primary;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(px - 42, py - 42, 84, 84);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(px - 8, py);
        ctx.lineTo(px + 8, py);
        ctx.moveTo(px, py - 8);
        ctx.lineTo(px, py + 8);
        ctx.stroke();
        ctx.restore();
      }

      frames++;
      fpsClock += dt;
      statClock += dt;
      if (statClock > 480) {
        const fps = Math.round((frames * 1000) / Math.max(1, fpsClock));
        setReadout({
          fps: Math.min(120, fps),
          ms: Number((1000 / Math.max(1, fps)).toFixed(1)),
          objects: targets.filter((target) => target.lock > 0.6).length,
        });
        frames = 0;
        fpsClock = 0;
        statClock = 0;
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
    };
  }, [preset]);

  return (
    <div className="detector">
      <div className="detector-frame" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointer}
          onPointerLeave={clearPointer}
          role="img"
          aria-label={`Simulated object-detection view: ${config.label}. Synthetic targets are tracked with labelled bounding boxes. Decorative.`}
        />
        <span className="detector-corner tl" aria-hidden="true" />
        <span className="detector-corner tr" aria-hidden="true" />
        <span className="detector-corner bl" aria-hidden="true" />
        <span className="detector-corner br" aria-hidden="true" />
        <div className="detector-hud" aria-hidden="true">
          <div className="detector-hud-row">
            <span className="detector-rec">
              <i />
              {config.label}
            </span>
            <span>{config.model}</span>
          </div>
          <div className="detector-hud-row">
            <span>
              objects <b>{String(readout.objects).padStart(2, "0")}</b>
            </span>
            <span>
              {readout.fps} fps <b>·</b> {readout.ms} ms
            </span>
          </div>
        </div>
      </div>
      <div className="detector-legend">
        <button
          type="button"
          className="detector-action"
          onClick={() => setPreset(preset === "pond" ? "inspect" : "pond")}
        >
          <ScanLine size={11} /> Switch scene
        </button>
        <button
          type="button"
          className="detector-action"
          onClick={() => setRunning((value) => !value)}
          aria-label={
            running
              ? "Pause the detection animation"
              : "Play the detection animation"
          }
        >
          {running ? <Pause size={11} /> : <Play size={11} />}
          {running ? "Pause" : "Play"}
        </button>
        {config.classes.map((cls) => (
          <span key={cls.name}>
            <i style={{ background: `oklch(0.72 0.16 ${cls.hue})` }} />
            {cls.name}
          </span>
        ))}
      </div>
    </div>
  );
}
