import { useEffect, useRef } from "react";
import profile from "../images/profile.png";

export default function CrystalProfile() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = 260, H = 260, CX = W / 2, CY = H / 2, R = 128;

    const palette = [
      ["#7f77dd", "#afa9ec", "#3c3489"],
      ["#5dcaa5", "#9fe1cb", "#0f6e56"],
      ["#378add", "#85b7eb", "#0c447c"],
      ["#d4537e", "#ed93b1", "#72243e"],
      ["#ef9f27", "#fac775", "#854f0b"],
    ];

    const makeCrystal = () => {
      const col = palette[Math.floor(Math.random() * palette.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 90;
      return {
        x: CX, y: CY, size: 6 + Math.random() * 18,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        driftAngle: angle, driftSpeed: 0.002 + Math.random() * 0.004,
        driftDist: dist, driftPhase: Math.random() * Math.PI * 2,
        col, alpha: 0.5 + Math.random() * 0.5,
        sides: Math.random() > 0.5 ? 6 : 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    };

    const crystals = Array.from({ length: 28 }, makeCrystal);

    const hex = (c, a) => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    let frame = 0;
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;
      const t = frame;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#06061a";
      ctx.fillRect(0, 0, W, H);

      for (const c of crystals) {
        const wave = Math.sin(t * c.driftSpeed + c.driftPhase) * 8;
        c.x = CX + Math.cos(c.driftAngle + t * c.driftSpeed * 0.4) * (c.driftDist + wave);
        c.y = CY + Math.sin(c.driftAngle + t * c.driftSpeed * 0.4) * (c.driftDist + wave);

        // glow
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 2.5);
        g.addColorStop(0, hex(c.col[0], 0.18));
        g.addColorStop(1, hex(c.col[0], 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const c of crystals) {
        const pulse = Math.sin(c.pulse + t * c.pulseSpeed) * 0.2;
        const sz = c.size * (1 + pulse);
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation + t * c.rotSpeed);
        ctx.beginPath();
        for (let i = 0; i < c.sides; i++) {
          const a = (i / c.sides) * Math.PI * 2 - Math.PI / 2;
          i === 0 ? ctx.moveTo(Math.cos(a) * sz, Math.sin(a) * sz)
                  : ctx.lineTo(Math.cos(a) * sz, Math.sin(a) * sz);
        }
        ctx.closePath();
        const grad = ctx.createRadialGradient(0, -sz * 0.3, 0, 0, 0, sz);
        grad.addColorStop(0, hex(c.col[1], c.alpha));
        grad.addColorStop(0.5, hex(c.col[0], c.alpha * 0.85));
        grad.addColorStop(1, hex(c.col[2], c.alpha * 0.3));
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = hex(c.col[1], Math.min(1, c.alpha + 0.3));
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    };

    animate();
    return () => cancelAnimationFrame(raf); // cleanup on unmount
  }, []);

  return (
    <div className="relative w-[260px] h-[260px] flex items-center justify-center mt-10">
        
      {/* Crystal canvas bg */}
      <canvas
        ref={canvasRef}
        width={260}
        height={260}
        className="absolute inset-0 rounded-full"
      />
      {/* Spinning gradient ring */}
      <div className="absolute inset-[-4px] rounded-full z-[2]"
        style={{ background: "conic-gradient(#7f77dd,#5dcaa5,#378add,#d4537e,#ef9f27,#7f77dd)", animation: "spin 4s linear infinite" }}
      />
      <div className="absolute inset-[4px] rounded-full bg-[#06061a] z-[3]" />
      <div className="absolute flex justify-between text-[[#06061a]] w-full z-[4] bg-white px-4 rounded whitespace-nowrap">
            <span>Full stack</span>
            <span>Developer</span>
        </div>
      {/* Profile image */}
      <img
        src={profile}
        alt="profile"
        className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover z-[5]"
      />
    </div>
  );
}