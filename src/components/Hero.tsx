import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TiltedCardStack from "./TiltedCardStack";

const STATS = [
  { value: "47", label: "Editors" },
  { value: "312", label: "Projects Done" },
  { value: "4.87★", label: "Avg. Rating" },
  { value: "91%", label: "Satisfaction" },
];

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-8 md:px-12 pt-24 pb-16 relative">
      
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/hero.png" 
          alt="Video Editing Workspace" 
          fill 
          priority
          className="object-cover opacity-25 blur-[1px]" 
        />
        {/* Gradients to blend the image perfectly into our dark site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/80 to-[#0a0a0b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/90 to-transparent" />
      </div>

      <div className="flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-7 animate-fade-up delay-100">
          <span className="w-7 h-px bg-[#e8431a]" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8431a] drop-shadow-md">Video Editing Marketplace</span>
        </div>
        <h1 className="font-syne font-extrabold leading-[1.0] tracking-[-2px] mb-6 animate-fade-up delay-200" style={{fontSize:"clamp(44px,5vw,68px)"}}>
          Find Skilled<br/>
          <span className="text-transparent" style={{WebkitTextStroke:"1px rgba(240,237,232,0.4)"}}>Video</span><br/>
          Editors.
        </h1>
        <p className="text-[15px] leading-[1.75] text-[rgba(240,237,232,0.6)] max-w-[400px] mb-12 font-light animate-fade-up delay-300">
          Connect with talented video editors from Assam and across India. Hire for gaming edits, anime AMVs, reels, and more.
        </p>
        <div className="flex items-center gap-5 animate-fade-up delay-400">
          <Link href="/editors" className="bg-[#e8431a] text-white px-7 py-3.5 rounded-md text-sm font-medium hover:opacity-85 hover:-translate-y-px transition-all duration-200" style={{boxShadow:"0 8px 30px rgba(232,67,26,0.5)"}}>
            Get Started
          </Link>
          <Link href="/editors" className="group flex items-center gap-2 text-sm text-[rgba(240,237,232,0.6)] hover:text-[#f0ede8] transition-colors duration-200">
            Browse Editors
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200"/>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/[0.06] animate-fade-up delay-500">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="font-syne block text-[26px] font-bold tracking-tight text-[#f0ede8] drop-shadow-md">{s.value}</span>
              <span className="block text-xs text-[#6b6b72] tracking-wide mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 animate-fade-up delay-300">
        <TiltedCardStack />
      </div>
    </section>
  );
}
