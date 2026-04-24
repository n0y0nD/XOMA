"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ritam Borah",
    handle: "@ritam.creates",
    platform: "YouTube – 48k subs",
    rating: 5,
    avatar: "RB",
    avatarColor: "bg-orange-900/40",
    text: "Found Arnav through XoMA and honestly it was a bit of a gamble at first. But the reel he delivered was cleaner than anything I could've done myself. Saved me like 3 days of editing. Already booked him again.",
  },
  {
    id: 2,
    name: "Shreya Gogoi",
    handle: "@shreyacreates",
    platform: "Instagram – 12k followers",
    rating: 5,
    avatar: "SG",
    avatarColor: "bg-purple-900/40",
    text: "Was sceptical because I'd been burned by freelancers before. But Ankita was super responsive and actually listened to the reference I sent. The Reel blew up — 2.3 lakh views. Wild.",
  },
  {
    id: 3,
    name: "Pranjal Deka",
    handle: "@pranjal_fx",
    platform: "YouTube – 91k subs",
    rating: 4,
    avatar: "PD",
    avatarColor: "bg-blue-900/40",
    text: "Good platform. Rahul did a solid job on two of my tech videos. One note — be specific with your brief, vague directions get vague results (not really a XoMA problem but worth saying). Overall would recommend.",
  },
  {
    id: 4,
    name: "Mou Kalita",
    handle: "@mou.weds",
    platform: "Wedding Filmmaker",
    rating: 5,
    avatar: "MK",
    avatarColor: "bg-green-900/40",
    text: "Hired Priya for my sister's wedding highlight and literally cried watching the final edit. She picked the perfect song without me even asking. That's the kind of thing you can't really explain — she just got it.",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "text-[#c9a96e]" : "text-white/10"}
          fill={i < count ? "#c9a96e" : "transparent"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="px-8 md:px-12 pb-32">
      <div className="mb-14">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8431a] block mb-3 flex items-center gap-2">
          <span className="w-4 h-px bg-[#e8431a]" /> What Creators Say
        </span>
        <h2 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight">
          Real{" "}
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.7)",
              color: "rgba(201,169,110,0.2)",
            }}
          >
            Reviews
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="relative bg-[rgba(17,17,19,0.5)] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-[rgba(17,17,19,0.75)] transition-all duration-300"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Quote mark */}
            <span
              className="absolute top-4 right-5 font-syne text-6xl font-black text-white/[0.04] select-none leading-none pointer-events-none"
              aria-hidden
            >
              "
            </span>

            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-10 h-10 rounded-full ${t.avatarColor} border border-white/[0.08] flex items-center justify-center font-syne text-xs font-bold text-[#f0ede8] shrink-0`}
              >
                {t.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-syne text-[14px] font-bold text-[#f0ede8] truncate">{t.name}</p>
                <p className="text-[11px] text-[#6b6b72] truncate">{t.platform}</p>
              </div>
              <StarRow count={t.rating} />
            </div>

            <p className="text-[14px] text-[rgba(240,237,232,0.65)] leading-relaxed font-light">
              {t.text}
            </p>

            <p className="text-[11px] text-[#3d3d42] mt-4 font-mono">{t.handle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
