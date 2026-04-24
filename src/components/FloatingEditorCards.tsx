"use client";

import { useState } from "react";
import { Star, Play } from "lucide-react";

const EDITORS = [
  {
    id: 1,
    initials: "RD",
    name: "Rahul Das",
    role: "YouTube Editor",
    rate: "₹800/hr",
    rating: "4.8",
    accent: "#e8431a",
    grad: "linear-gradient(135deg, #1a0808 0%, #2d1010 40%, #150a20 100%)",
    glow: "rgba(232,67,26,0.35)",
    reviewCount: 120,
  },
  {
    id: 2,
    initials: "NR",
    name: "Niharika Roy",
    role: "Anime AMV",
    rate: "₹500/hr",
    rating: "4.9",
    accent: "#7c6fdf",
    grad: "linear-gradient(135deg, #080d1a 0%, #101828 40%, #1a0820 100%)",
    glow: "rgba(124,111,223,0.35)",
    reviewCount: 5,
  },
  {
    id: 3,
    initials: "AH",
    name: "Arnav Hazarika",
    role: "VFX & Reels",
    rate: "₹1,000/hr",
    rating: "4.7",
    accent: "#c9a96e",
    grad: "linear-gradient(135deg, #1a1008 0%, #2d1f00 40%, #0a0a15 100%)",
    glow: "rgba(201,169,110,0.35)",
    reviewCount: 110,
  },
];

// Stacking config: [z, x-offset, y-offset, rotation, scale]
const STACK = [
  { z: 10, x:  0,   y: 0,   rot:  0,   scale: 1.0   }, // front
  { z:  9, x: -28,  y: 16,  rot: -6,   scale: 0.94  }, // middle
  { z:  8, x: -52,  y: 28,  rot: -11,  scale: 0.88  }, // back
];

export default function FloatingEditorCards() {
  // order[0] = index of front card, order[1] = middle, order[2] = back
  const [order, setOrder] = useState([0, 1, 2]);
  const [animating, setAnimating] = useState(false);

  function bringToFront(stackPos: number) {
    if (animating || stackPos === 0) return;
    setAnimating(true);
    setOrder((prev) => {
      const next = [...prev];
      // Rotate so clicked card comes to front
      const clicked = next[stackPos];
      next.splice(stackPos, 1);
      next.unshift(clicked);
      return next;
    });
    setTimeout(() => setAnimating(false), 500);
  }

  return (
    <div className="hidden lg:flex items-center justify-center relative">
      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: EDITORS[order[0]].glow, transition: "background 0.5s ease" }}
      />

      {/* Card stack container */}
      <div className="relative w-[300px] h-[400px]">
        {order.map((editorIdx, stackPos) => {
          const editor = EDITORS[editorIdx];
          const pos = STACK[stackPos];
          const isFront = stackPos === 0;

          return (
            <div
              key={editor.id}
              onClick={() => bringToFront(stackPos)}
              className="absolute w-[300px] h-[390px] rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                zIndex: pos.z,
                transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rot}deg) scale(${pos.scale})`,
                transition: animating
                  ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease, opacity 0.45s ease"
                  : "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                boxShadow: isFront
                  ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)`
                  : `0 12px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)`,
                opacity: stackPos === 2 ? 0.7 : 1,
              }}
            >
              {/* Card gradient bg */}
              <div className="absolute inset-0" style={{ background: editor.grad }} />

              {/* Glow blob inside card */}
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl"
                style={{ background: editor.glow, opacity: 0.5 }}
              />

              {/* ── Video preview area ── */}
              <div className="relative h-[185px] overflow-hidden">
                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  }}
                />

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Centered play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      borderColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <Play size={16} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>

                {/* Category pill top-left */}
                <div
                  className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: editor.accent,
                  }}
                >
                  {editor.role}
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 text-[10px] text-white/50 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                  2:34
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
              </div>

              {/* ── Card body ── */}
              <div className="relative px-4 pt-3 pb-4" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)" }}>
                {/* Avatar + rating row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderColor: editor.accent + "55",
                        color: "#f0ede8",
                      }}
                    >
                      {editor.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#f0ede8] leading-none">{editor.name}</p>
                      <p className="text-[11px] text-white/40 mt-0.5">{editor.role}</p>
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: editor.accent + "22", color: editor.accent }}
                  >
                    <Star size={9} fill={editor.accent} />
                    {editor.rating}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-3" />

                {/* Rate + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-white/30 block">Starting from</span>
                    <span className="text-[16px] font-bold text-[#f0ede8] leading-none font-syne">{editor.rate}</span>
                  </div>
                  <div
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{
                      background: isFront ? editor.accent : "rgba(255,255,255,0.06)",
                      color: isFront ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {isFront ? "View Profile →" : "Click to view"}
                  </div>
                </div>
              </div>

              {/* Front card: hover lift effect */}
              {!isFront && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(0,0,0,0.15)" }}>
                  <span className="text-[11px] text-white/60 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    Tap to bring forward
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {order.map((editorIdx, stackPos) => (
          <button
            key={editorIdx}
            onClick={() => bringToFront(stackPos)}
            className="rounded-full transition-all duration-300"
            style={{
              width: stackPos === 0 ? "20px" : "6px",
              height: "6px",
              background: stackPos === 0 ? EDITORS[editorIdx].accent : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
