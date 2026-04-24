"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Editors", href: "/editors" },
  { label: "Client Portal", href: "/dashboard/client" },
  { label: "Editor Portal", href: "/dashboard/editor" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform background opacity and border based on scroll
  const backgroundOpacity = useTransform(scrollY, [0, 50], [0.3, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.08]);
  const blurValue = useTransform(scrollY, [0, 50], [4, 24]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-16 transition-colors duration-300"
      style={{ 
        backgroundColor: useTransform(backgroundOpacity, (val) => `rgba(10,10,12,${val})`),
        backdropFilter: useTransform(blurValue, (val) => `blur(${val}px)`),
        borderBottom: useTransform(borderOpacity, (val) => `1px solid rgba(255,255,255,${val})`)
      }}
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#e8431a] to-transparent origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 300], [0, 1]),
          opacity: useTransform(scrollY, [0, 100], [0, 1])
        }}
      />
      
      <Link href="/" className="flex items-center gap-2 font-syne text-xl font-extrabold tracking-tight text-[#f0ede8] group pt-0.5">
        <span className="w-[7px] h-[7px] rounded-full bg-[#e8431a] group-hover:scale-150 transition-transform duration-300" 
              style={{ boxShadow: "0 0 10px rgba(232,67,26,0.6)" }}/>
        XoMA
      </Link>
      
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[13px] text-[#6b6b72] hover:text-[#f0ede8] transition-colors duration-200 tracking-wide font-medium relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#f0ede8] transition-all duration-300 group-hover:w-full opacity-50"/>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/login" className="text-[13px] text-[#6b6b72] hover:text-[#f0ede8] transition-colors duration-200 font-medium">
            Log in
          </Link>
        </li>
        <li>
          <Link href="/editors" className="bg-[#e8431a] text-white text-[13px] font-semibold px-5 py-[9px] rounded-md hover:bg-[#d63a14] transition-all duration-200 shadow-[0_4px_20px_rgba(232,67,26,0.25)] hover:shadow-[0_8px_30px_rgba(232,67,26,0.4)] hover:-translate-y-px">
            Hire an Editor
          </Link>
        </li>
      </ul>
      
      <button className="md:hidden text-[#6b6b72] hover:text-[#f0ede8]" onClick={() => setOpen(o => !o)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 left-0 right-0 border-b border-white/[0.08] px-8 py-6 flex flex-col gap-6 md:hidden shadow-2xl"
          style={{ background: "rgba(10,10,12,0.98)", backdropFilter: "blur(24px)" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="text-[15px] font-syne font-bold text-[#6b6b72] hover:text-[#f0ede8] transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="h-px w-full bg-white/[0.06] my-1" />
          <Link href="/login" onClick={() => setOpen(false)} className="text-[15px] font-syne font-bold text-[#6b6b72] hover:text-[#f0ede8] transition-colors">Log in</Link>
          <Link href="/editors" onClick={() => setOpen(false)} className="bg-[#e8431a] text-white text-[15px] font-syne font-bold px-6 py-3.5 rounded-lg text-center hover:opacity-85 transition-opacity mt-2">Hire an Editor</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
