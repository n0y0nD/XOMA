"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = ["Gaming", "Anime AMV", "Reels", "VFX", "Color Grading"];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [service, setService] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (service) params.set("service", service);
    if (maxRate) params.set("maxRate", maxRate);
    router.push(`/editors?${params.toString()}`);
  }

  return (
    <div className="px-8 md:px-12 pb-20 relative z-20">
      {/* Background shadow glow when focused */}
      <motion.div 
        className="absolute w-[600px] h-[100px] top-4 left-1/2 -translate-x-1/2 rounded-full blur-[80px] pointer-events-none"
        animate={{ 
          background: isFocused ? "rgba(232,67,26,0.15)" : "transparent",
          opacity: isFocused ? 1 : 0 
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Search bar wrapper */}
      <motion.div 
        className="relative flex items-center gap-3 bg-[rgba(17,17,19,0.5)] backdrop-blur-2xl border border-white/[0.08] rounded-xl px-5 py-2 max-w-2xl transition-colors duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        animate={{ 
          borderColor: isFocused ? "rgba(232,67,26,0.5)" : "rgba(255,255,255,0.08)",
          boxShadow: isFocused ? "0 8px 40px rgba(232,67,26,0.2), inset 0 0 0 1px rgba(232,67,26,0.1)" : "0 8px 30px rgba(0,0,0,0.5)",
          y: isFocused ? -2 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Search size={16} className={`shrink-0 transition-colors duration-300 ${isFocused ? "text-[#e8431a]" : "text-[#6b6b72]"}`} />
        
        <input
          type="text"
          placeholder="Search freelancers, skills, or services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 bg-transparent text-[15px] text-[#f0ede8] placeholder:text-[#6b6b72] outline-none font-light py-2 px-1"
        />
        
        <div className="w-px h-5 bg-white/[0.1] hidden md:block" />
        
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="hidden md:block bg-transparent text-[13px] text-[#6b6b72] focus:text-[#f0ede8] outline-none cursor-pointer px-2 py-2 appearance-none transition-colors border-none"
        >
          <option value="" className="bg-[#111113]">All Services</option>
          <option value="Gaming" className="bg-[#111113]">Gaming Edits</option>
          <option value="Anime" className="bg-[#111113]">Anime AMV</option>
          <option value="Reels" className="bg-[#111113]">Reels &amp; Shorts</option>
          <option value="VFX" className="bg-[#111113]">VFX</option>
        </select>
        
        <div className="w-px h-5 bg-white/[0.1] hidden md:block" />
        
        <select
          value={maxRate}
          onChange={(e) => setMaxRate(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="hidden md:block bg-transparent text-[13px] text-[#6b6b72] focus:text-[#f0ede8] outline-none cursor-pointer px-2 py-2 appearance-none transition-colors border-none"
        >
          <option value="" className="bg-[#111113]">All Rates</option>
          <option value="500" className="bg-[#111113]">Under ₹500/hr</option>
          <option value="1000" className="bg-[#111113]">Under ₹1,000/hr</option>
          <option value="2000" className="bg-[#111113]">Under ₹2,000/hr</option>
        </select>
        
        <button
          onClick={handleSearch}
          className="bg-[#e8431a] text-white text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#d63a14] transition-all duration-200 whitespace-nowrap shadow-[0_4px_20px_rgba(232,67,26,0.3)] min-w-[90px]"
        >
          Search
        </button>
      </motion.div>

      {/* Quick tags */}
      <div className="flex items-center gap-2.5 mt-4 flex-wrap relative z-10 transition-opacity duration-300" style={{ opacity: isFocused ? 1 : 0.8 }}>
        <span className="text-[11px] font-medium tracking-wide uppercase text-[#6b6b72]">Popular:</span>
        {SERVICES.map((tag) => (
          <button
            key={tag}
            onClick={() => { setService(tag); handleSearch(); }}
            className="text-[11px] px-3 py-1.5 bg-[rgba(24,24,27,0.5)] backdrop-blur-sm border border-white/[0.04] rounded-full text-[rgba(240,237,232,0.6)] hover:bg-[rgba(255,255,255,0.05)] hover:border-white/[0.15] hover:text-[#f0ede8] transition-all duration-300"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
