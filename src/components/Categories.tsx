import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { icon: "🎮", name: "Gaming Edits", count: "48 editors", color: "#4ade80", bg: "/images/gaming.png",  service: "Gaming" },
  { icon: "✦",  name: "Anime AMVs",   count: "32 editors", color: "#a855f7", bg: "/images/anime.png", service: "Anime"  },
  { icon: "▶",  name: "Reels & Shorts",count: "61 editors", color: "#e8431a", bg: "/images/hero.png",  service: "Reels"  },
  { icon: "◈",  name: "VFX & Motion", count: "27 editors", color: "#c9a96e", bg: "/images/vfx.png",   service: "VFX"   },
];

export default function Categories() {
  return (
    <section className="px-8 md:px-12 pb-24">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b6b72] block mb-2">
          Explore
        </span>
        <h2 className="font-syne text-4xl font-bold tracking-tight">
          Edit{" "}
          <span className="text-[#c9a96e]">Categories</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/editors?service=${cat.service}`}
            className="group relative bg-[#111113] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-48 flex flex-col justify-end"
          >
            {/* Background Image */}
            <Image 
              src={cat.bg} 
              alt={cat.name} 
              fill 
              className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110 blur-[1px] group-hover:blur-0" 
            />
            
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
            
            {/* Hover glow */}
            <div
              className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
              style={{ background: cat.color }}
            />

            <div className="relative z-10">
              <span className="block text-2xl mb-3 drop-shadow-md">{cat.icon}</span>
              <p className="font-syne text-[18px] font-bold tracking-tight mb-1 break-words">{cat.name}</p>
              <p className="text-sm font-medium text-white/50">{cat.count}</p>
              
              <div
                className="mt-4 h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ background: cat.color }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
