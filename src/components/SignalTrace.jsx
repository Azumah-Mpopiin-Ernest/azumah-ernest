import { useLayoutEffect, useMemo, useRef, useState } from "react";

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Noise that resolves into a clean carrier: signal found in the noise.
function buildPath(w, h) {
  const rand = rng(7);
  const mid = h / 2;
  const cycles = Math.max(6, Math.round(w / 55));
  const points = [];
  for (let x = 0; x <= w; x += 3) {
    const t = x / w;
    const noiseAmp = Math.max(0, 1 - t / 0.45) ** 1.6 * h * 0.36;
    const noise = (rand() - 0.5) * 2 * noiseAmp;
    const carrierAmp =
      h * (0.06 + Math.min(1, Math.max(0, (t - 0.25) / 0.35)) * 0.15);
    const carrier = Math.sin(t * Math.PI * 2 * cycles) * carrierAmp;
    points.push(`${x},${(mid + noise + carrier).toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
}

export default function SignalTrace() {
  const ref = useRef(null);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize((prev) =>
        prev && Math.abs(prev.w - width) < 8 && prev.h === Math.round(height)
          ? prev
          : { w: Math.round(width), h: Math.round(height) },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const path = useMemo(() => size && buildPath(size.w, size.h), [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-28 overflow-hidden rounded-2xl border border-line bg-[#0b1626] sm:h-36 md:h-44"
      style={{
        backgroundImage:
          "linear-gradient(to right, #1b2e46 1px, transparent 1px), linear-gradient(to bottom, #1b2e46 1px, transparent 1px)",
        backgroundSize: "10% 25%",
      }}
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#2a4466]" />
      {size && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="absolute inset-0 block"
        >
          <path
            className="trace-path"
            d={path}
            pathLength="1"
            fill="none"
            stroke="var(--color-signal)"
            strokeOpacity="0.22"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            className="trace-path"
            d={path}
            pathLength="1"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
