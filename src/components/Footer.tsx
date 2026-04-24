import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-8 md:px-12 py-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-syne text-sm font-bold text-[#6b6b72]">XoMA</span>
        <span className="text-[11px] text-[#3d3d42] tracking-wide">Built in Assam, India 🏔️</span>
      </div>
      <ul className="flex items-center gap-7">
        {["Privacy", "Terms", "Support"].map((item) => (
          <li key={item}>
            <Link href="#" className="text-xs text-[#6b6b72] hover:text-[rgba(240,237,232,0.5)] transition-colors">
              {item}
            </Link>
          </li>
        ))}
        <li className="text-xs text-[#6b6b72]">© 2025 XoMA</li>
      </ul>
    </footer>
  );
}
