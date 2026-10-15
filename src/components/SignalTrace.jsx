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

// Where the receiver (portrait) sits inside the scope, derived from its size.
function receiverBox(w, h) {
  const size = Math.round(h * 0.86);
  const right = Math.max(12, Math.round(w * 0.03));
  return { size, right, left: w - right - size, top: Math.round((h - size) / 2) };
}

// Noise that resolves into a clean carrier, then settles into the receiver.
function buildPath(w, h, endX) {
  const rand = rng(7);
  const mid = h / 2;
  const span = Math.max(1, endX);
  const cycles = Math.max(4, Math.round(span / 55));
  const points = [];
  for (let x = 0; x <= endX; x += 3) {
    const t = x / span;
    const noiseAmp = Math.max(0, 1 - t / 0.45) ** 1.6 * h * 0.36;
    const noise = (rand() - 0.5) * 2 * noiseAmp;
    const swell = Math.min(1, Math.max(0, (t - 0.25) / 0.35));
    const settle = Math.min(1, Math.max(0, (1 - t) / 0.12));
    const carrierAmp = h * (0.06 + swell * 0.15) * settle;
    const carrier = Math.sin(t * Math.PI * 2 * cycles) * carrierAmp;
    points.push(`${x},${(mid + noise + carrier).toFixed(1)}`);
  }
  points.push(`${endX},${mid}`);
  return `M${points.join(" L")}`;
}

export default function SignalTrace({ children }) {
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

  const box = size && children ? receiverBox(size.w, size.h) : null;
  const endX = size ? (box ? box.left + box.size * 0.08 : size.w) : 0;
  const path = useMemo(() => size && buildPath(size.w, size.h, endX), [size, endX]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#0b1626] ${
        children ? "h-40 sm:h-48 md:h-60" : "h-28 sm:h-36 md:h-44"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(to right, #1b2e46 1px, transparent 1px), linear-gradient(to bottom, #1b2e46 1px, transparent 1px)",
        backgroundSize: "10% 25%",
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[#2a4466]" />
      {size && (
        <svg
          aria-hidden="true"
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
      {box && (
        <div
          className="absolute"
          style={{ left: box.left, top: box.top, width: box.size, height: box.size }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
