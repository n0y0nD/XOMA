"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Play, Star } from "lucide-react";

const EDITORS = [
  {
    id: 1,
    initials: "RD",
    name: "Rahul Das",
    role: "YouTube Video Editor",
    rate: "₹800",
    rating: "4.8",
    reviews: 120,
    available: true,
    skills: ["Color Grade", "Motion FX", "4K"],
    accent: "#e8431a",
    border: "rgba(232,67,26,0.5)",
    grad: "linear-gradient(160deg, #1a0808 0%, #2d1010 50%, #150a20 100%)",
    glowColor: "rgba(232,67,26,0.3)",
    category: "YT EDITOR",
  },
  {
    id: 2,
    initials: "NR",
    name: "Niharika Roy",
    role: "Anime AMV Editor",
    rate: "₹500",
    rating: "4.9",
    reviews: 5,
    available: false,
    skills: ["Beat Sync", "AMV", "After Effects"],
    accent: "#7c6fdf",
    border: "rgba(124,111,223,0.5)",
    grad: "linear-gradient(160deg, #080d1a 0%, #101828 50%, #1a0820 100%)",
    glowColor: "rgba(124,111,223,0.3)",
    category: "ANIME AMV",
  },
  {
    id: 3,
    initials: "AH",
    name: "Arnav Hazarika",
    role: "VFX & Reels Editor",
    rate: "₹1,000",
    rating: "4.7",
    reviews: 110,
    available: true,
    skills: ["VFX", "Reels", "DaVinci"],
    accent: "#c9a96e",
    border: "rgba(201,169,110,0.5)",
    grad: "linear-gradient(160deg, #1a1008 0%, #2d1f00 50%, #0a0a15 100%)",
    glowColor: "rgba(201,169,110,0.3)",
    category: "VFX & REELS",
  },
];

export default function TiltedCardStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -18,
      y: (x - 0.5) * 18,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }

  const editor = EDITORS[activeIdx];
  const backEditor = EDITORS[(activeIdx + 1) % EDITORS.length];

  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative py-10">

      {/* Ambient glow that follows active editor color */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ background: editor.glowColor }}
      />

      {/* Stack container */}
      <div className="relative" style={{ width: "360px", height: "480px" }}>

        {/* Back card — peeking */}
        <div
          onClick={() => setActiveIdx((activeIdx + 1) % EDITORS.length)}
          className="absolute cursor-pointer transition-all duration-500 hover:translate-y-[-4px]"
          style={{
            width: "340px",
            height: "460px",
            top: "24px",
            left: "36px",
            borderRadius: "20px",
            background: backEditor.grad,
            border: `1px solid rgba(255,255,255,0.06)`,
            transform: "rotate(5deg) scale(0.93)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-syne font-bold text-lg border"
              style={{ borderColor: backEditor.border, color: "#f0ede8", background: "rgba(0,0,0,0.3)" }}
            >
              {backEditor.initials}
            </div>
            <p className="font-syne text-base font-bold text-[#f0ede8]">{backEditor.name}</p>
            <p className="text-xs text-white/40">{backEditor.role}</p>
            <p className="text-[11px] text-white/30 mt-2">click to bring forward</p>
          </div>
        </div>

        {/* Front card — main with 3D tilt */}
        <div
          ref={cardRef}
          className="absolute cursor-pointer"
          style={{
            width: "360px",
            height: "470px",
            top: 0,
            left: 0,
            zIndex: 2,
            transformStyle: "preserve-3d",
            transform: isHovering
              ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
              : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: isHovering
              ? "transform 0.1s ease-out"
              : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            borderRadius: "22px",
            background: editor.grad,
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: isHovering
              ? `0 40px 80px rgba(0,0,0,0.7), 0 0 40px ${editor.glowColor}`
              : "0 24px 60px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
          onMouseMove={(e) => { setIsHovering(true); handleMouseMove(e); }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mouse-follow glow inside card */}
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              width: "200px", height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${editor.glowColor} 0%, transparent 70%)`,
              left: `${glowPos.x}%`,
              top: `${glowPos.y}%`,
              transform: "translate(-50%, -50%)",
              opacity: isHovering ? 0.8 : 0,
            }}
          />

          {/* Video preview area */}
          <div className="relative overflow-hidden" style={{ height: "58%" }}>
            <div className="absolute inset-0" style={{ background: editor.grad }} />

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)",
              }}
            />

            {/* Inner glow top */}
            <div
              className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none"
              style={{ background: editor.glowColor, opacity: 0.6 }}
            />

            {/* Play button with pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Pulse rings */}
                {[52, 40, 30].map((size, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                      width: size * 2, height: size * 2,
                      borderColor: editor.accent,
                      opacity: isHovering ? 0.3 - i * 0.08 : 0.15 - i * 0.04,
                      transition: "opacity 0.3s",
                    }}
                  />
                ))}
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200"
                  style={{
                    background: editor.accent,
                    transform: isHovering ? "scale(1.12)" : "scale(1)",
                    boxShadow: `0 0 30px ${editor.glowColor}`,
                  }}
                >
                  <Play size={18} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Category pill */}
            <div
              className="absolute top-3.5 left-3.5 flex items-center gap-1.5 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: editor.accent,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: editor.accent }}
              />
              {editor.category}
            </div>

            {/* Duration */}
            <div className="absolute bottom-3 right-3 text-[10px] text-white/50 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
              2:34
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Card body */}
          <div
            className="px-4 pt-3 pb-4 flex flex-col gap-2.5"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(20px)" }}
          >
            {/* Avatar + name row */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-sm shrink-0 border-2"
                style={{ borderColor: editor.accent, background: "rgba(0,0,0,0.4)", color: "#f0ede8" }}
              >
                {editor.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-syne text-[15px] font-bold text-[#f0ede8] leading-none">{editor.name}</p>
                  {editor.available && (
                    <span className="flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(74,200,120,0.15)", color: "#4ade80", border: "1px solid rgba(74,200,120,0.3)" }}>
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      Live
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/40 mt-0.5">{editor.role}</p>
              </div>
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold"
                style={{ background: editor.accent + "22", color: editor.accent }}
              >
                <Star size={9} fill={editor.accent} />
                {editor.rating}
              </div>
            </div>

            {/* Skills */}
            <div className="flex gap-1.5 flex-wrap">
              {editor.skills.map((sk) => (
                <span
                  key={sk}
                  className="text-[10px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(240,237,232,0.5)",
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Rate + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/25 block">Starting from</span>
                <span className="font-syne text-[18px] font-bold text-[#f0ede8]">{editor.rate}<span className="text-xs font-light text-white/30">/hr</span></span>
              </div>
              <Link
                href={`/editors/${editor.id}`}
                className="text-[12px] font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: editor.accent,
                  color: "#fff",
                  boxShadow: `0 4px 20px ${editor.glowColor}`,
                }}
              >
                View Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-6">
        {EDITORS.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActiveIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? "22px" : "7px",
              height: "7px",
              background: i === activeIdx ? editor.accent : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
