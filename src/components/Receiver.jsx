// The portrait as a receiver: dark dial until the trace arrives, then it "powers on".
export default function Receiver({ src, alt }) {
  const ticks = Array.from({ length: 48 }, (_, i) => i);

  return (
    <div className="relative h-full w-full">
      <span aria-hidden="true" className="receiver-ring absolute inset-0 rounded-full border border-signal" />
      <span
        aria-hidden="true"
        className="receiver-ring absolute inset-0 rounded-full border border-signal"
        style={{ animationDelay: "2.6s" }}
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="receiver-dial absolute inset-0 h-full w-full">
        {ticks.map((i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const long = i % 4 === 0;
          const r1 = long ? 45.5 : 47;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * r1}
              y1={50 + Math.sin(a) * r1}
              x2={50 + Math.cos(a) * 49.5}
              y2={50 + Math.sin(a) * 49.5}
              stroke={long ? "var(--color-signal)" : "#3a5878"}
              strokeWidth={long ? 0.9 : 0.6}
            />
          );
        })}
      </svg>

      <div className="absolute inset-[9%] overflow-hidden rounded-full border-2 border-line bg-[#0b1626]">
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[#2a4466]" />
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-[#2a4466]" />
        {src && (
          <img
            src={src}
            alt={alt}
            className="receiver-photo relative h-full w-full object-cover"
            fetchPriority="high"
          />
        )}
      </div>
    </div>
  );
}
