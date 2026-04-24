"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Editor } from "@/types";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

const THUMB_IMAGES = [
  "/images/hero.png",
  "/images/anime.png",
  "/images/gaming.png",
  "/images/vfx.png"
];

const GLOW_COLORS = [
  "rgba(232,67,26,0.25)",
  "rgba(60,100,220,0.25)",
  "rgba(201,169,110,0.25)",
];

const STATIC_GLOW = [
  "bg-[rgba(232,67,26,0.18)]",
  "bg-[rgba(60,100,220,0.18)]",
  "bg-[rgba(201,169,110,0.12)]",
];

interface Props {
  editor: Editor;
  index?: number;
}

export default function EditorCard({ editor, index = 0 }: Props) {
  const imageSrc = THUMB_IMAGES[index % THUMB_IMAGES.length];
  const glow = GLOW_COLORS[index % GLOW_COLORS.length];
  const staticGlow = STATIC_GLOW[index % STATIC_GLOW.length];

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      ref={cardRef}
      onMouseMove={(e) => { setIsHovering(true); handleMouseMove(e); }}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative bg-[rgba(17,17,19,0.7)] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
      whileHover={{ y: -6 }}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.06)" }}
    >
      {/* Mouse Follow Glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-3xl z-0"
        style={{
          width: 250, height: 250,
          background: glow,
          left: mousePos.x - 125,
          top: mousePos.y - 125,
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={`${editor.name} portfolio`} 
            fill 
            className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 pointer-events-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,19,0.9)] to-transparent" />
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`w-28 h-28 rounded-full ${staticGlow} blur-2xl transition-transform duration-500 group-hover:scale-125`} />
          </div>

          {/* Available badge */}
          {editor.available && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-900/30 border border-green-600/30 text-green-400 text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available
            </div>
          )}

          {/* Avatar */}
          <div className="absolute bottom-0 translate-y-1/2 left-5 w-11 h-11 rounded-full bg-[#18181b] border-[3px] border-[#111113] flex items-center justify-center font-syne text-sm font-bold text-[#f0ede8] shadow-lg">
            {editor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
        </div>

        {/* Body */}
        <div className="pt-8 px-5 pb-5 flex flex-col flex-1">
          <p className="font-syne text-[17px] font-bold tracking-tight">{editor.name}</p>
          <p className="text-xs text-[#6b6b72] mt-0.5 mb-4 font-light">{editor.role}</p>

          <div className="mt-auto">
            <div className="flex items-center justify-between py-3.5 border-t border-white/[0.06] mb-4">
              <span className="font-syne text-base font-bold tracking-tight">
                ₹{editor.rate.toLocaleString("en-IN")}
                <span className="font-sans text-[11px] font-light text-[#6b6b72]">/hr</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#6b6b72]">
                <Star size={11} className="text-[#c9a96e]" fill="#c9a96e" />
                <span className="text-[#f0ede8] font-medium">{editor.rating.toFixed(1)}</span>
                <span className="text-white/20">({editor.reviewCount})</span>
              </span>
            </div>

            <Link
              href={`/editors/${editor._id}`}
              className="block w-full text-center py-2.5 rounded-lg border border-white/[0.06] text-[13px] text-[rgba(240,237,232,0.6)] hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-[#f0ede8] transition-all duration-300 font-medium"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
