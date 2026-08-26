import { useEffect, useRef } from "react";
import profile from "./profile.png";

const BARS = 64;

export default function CrystalProfile() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = 280,
      H = 280,
      CX = W / 2,
      CY = H / 2;
    const innerR = 92,
      maxBar = 34;

    const bars = Array.from({ length: BARS }, () => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }));

    let frame = 0;
    let raf;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < BARS; i++) {
        const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        const b = bars[i];
        const wobble = Math.sin(frame * b.speed + b.phase) * 0.5 + 0.5;
        const len = 6 + wobble * maxBar;

        const x1 = CX + Math.cos(angle) * innerR;
        const y1 = CY + Math.sin(angle) * innerR;
        const x2 = CX + Math.cos(angle) * (innerR + len);
        const y2 = CY + Math.sin(angle) * (innerR + len);

        ctx.strokeStyle = i / BARS < 0.5 ? "#4fd8c4" : "#e8963d";
        ctx.globalAlpha = 0.35 + wobble * 0.55;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center mt-10 mx-auto">
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        className="absolute inset-0"
      />
      <div className="absolute w-[184px] h-[184px] rounded-full border border-[#232838] bg-[#10141f] overflow-hidden z-[3] shadow-[0_0_60px_-10px_#4fd8c455]">
        <img
          src={profile}
          alt="Azumah Mpopiin Ernest"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-[4] font-mono text-[10px] tracking-widest text-[#8992a9] bg-[#0a0e17] border border-[#232838] px-3 py-1 rounded-full whitespace-nowrap">
        Full Stack Dev <span className="text-[#4fd8c4]">●</span>
      </div>
    </div>
  );
}
