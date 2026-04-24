"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Overview", href: "/dashboard/client", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/client/projects", icon: FolderKanban },
  { name: "Messages", href: "/dashboard/client/messages", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Very simple detection of whether it's cliet or editor dashboard based on URL
  const isEditor = pathname.includes("/dashboard/editor");
  
  const navLinks = isEditor 
    ? [
        { name: "Portal Stats", href: "/dashboard/editor", icon: LayoutDashboard },
        { name: "My Gigs", href: "/dashboard/editor/gigs", icon: FolderKanban },
        { name: "Messages", href: "/dashboard/editor/messages", icon: MessageSquare },
        { name: "Settings", href: "/dashboard/editor/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
        { name: "My Projects", href: "/dashboard/client/projects", icon: FolderKanban },
        { name: "Messages", href: "/dashboard/client/messages", icon: MessageSquare },
      ];

  return (
    <aside className="w-64 h-full bg-[rgba(17,17,19,0.5)] backdrop-blur-3xl border-r border-white/[0.06] flex flex-col pt-8 pb-6 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      {/* Brand */}
      <div className="px-8 mb-10">
        <Link href="/" className="flex items-center gap-2 font-syne text-2xl font-extrabold tracking-tight text-[#f0ede8]">
          <span className="w-2 h-2 rounded-full bg-[#e8431a]" style={{ boxShadow: "0 0 10px rgba(232,67,26,0.6)" }}/>
          XoMA
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-semibold tracking-widest text-[#6b6b72] uppercase mb-3">
          {isEditor ? "Editor Menu" : "Client Menu"}
        </p>

        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#e8431a]/10 text-[#e8431a] border border-[#e8431a]/20 translate-x-1" 
                  : "text-[#6b6b72] hover:bg-white/[0.04] hover:text-[#f0ede8] border border-transparent"
              )}
            >
              <Icon size={16} className={isActive ? "text-[#e8431a]" : "text-[#6b6b72]"} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="px-4 mt-auto">
        <div className="h-px w-full bg-white/[0.06] mb-4" />
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#6b6b72] hover:bg-white/[0.04] hover:text-[#f0ede8] transition-all"
        >
          <LogOut size={16} />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}
