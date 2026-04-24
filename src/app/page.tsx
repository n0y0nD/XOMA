import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import EditorCard from "@/components/EditorCard";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import AtmosphericBg from "@/components/AtmosphericBg";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import type { Editor } from "@/types";
import { FadeUp, StaggerContainer, Breathe } from "@/components/MotionWrappers";

const FALLBACK_EDITORS: Editor[] = [
  { _id: "1", name: "Rahul Das", role: "YouTube Video Editor", rate: 800, rating: 4.8, reviewCount: 120, available: false, skills: ["YouTube", "Color Grading", "Motion Graphics"], bio: "5 years crafting cinematic YouTube content.", createdAt: "", reviews: [{id: "f1", author: "TechWithTim", rating: 5, comment: "Absolutely phenomenal edits.", date:"2024-03-12"}] },
  { _id: "2", name: "Niharika Roy", role: "Anime AMV Editor", rate: 500, rating: 4.9, reviewCount: 5, available: false, skills: ["AMV", "After Effects", "Anime"], bio: "Specialist in rhythm-synced anime music videos.", createdAt: "", reviews: [] },
  { _id: "3", name: "Arnav Hazarika", role: "VFX & Reels Editor", rate: 1000, rating: 4.7, reviewCount: 110, available: true, skills: ["VFX", "Reels", "DaVinci Resolve"], bio: "High-impact short-form content and visual effects.", createdAt: "", reviews: [] },
];

async function getTopEditors(): Promise<Editor[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/editors`, { next: { revalidate: 60 } });
    if (!res.ok) return FALLBACK_EDITORS;
    const json = await res.json();
    const data = json.data ?? [];
    return data.length > 0 ? data.slice(0, 3) : FALLBACK_EDITORS;
  } catch { return FALLBACK_EDITORS; }
}

export default async function HomePage() {
  const editors = await getTopEditors();
  return (
    <>
      <AtmosphericBg ghostWord="XOMA" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <FadeUp delay={0.2} y={20}>
          <SearchBar />
        </FadeUp>
        
        <section className="px-8 md:px-12 pb-32 pt-10">
          <FadeUp delay={0.1}>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8431a] block mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-[#e8431a]"/> Top Talent
                </span>
                <h2 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight">
                  Browse Top <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)", color: "rgba(201,169,110,0.2)" }}>Editors</span>
                </h2>
              </div>
              <Link href="/editors" className="text-[14px] font-medium text-[#6b6b72] hover:text-[#f0ede8] border-b border-white/[0.06] hover:border-[#e8431a] pb-1 transition-all duration-300">
                View all editors →
              </Link>
            </div>
          </FadeUp>
          
          <StaggerContainer staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editors.map((editor, i) => <EditorCard key={editor._id} editor={editor} index={i} />)}
            </div>
          </StaggerContainer>
        </section>

        <section className="px-8 md:px-12 pb-32">
          <FadeUp>
            <div className="mb-14">
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8431a] block mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-[#e8431a]"/> Simple Process
              </span>
              <h2 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight">
                How It <span className="text-[#e8431a]">Works</span>
              </h2>
            </div>
          </FadeUp>
          
          <StaggerContainer staggerDelay={0.2}>
            {/* Using group for interactive dimming effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 group/timeline">
              {[
                { step: "01", title: "Browse Editors", desc: "Search by skill, rate, or availability. Filter through portfolios tailored exactly to what you need." },
                { step: "02", title: "View Portfolio", desc: "Check past work, ratings, and read completely transparent reviews from previous clients." },
                { step: "03", title: "Hire & Collaborate", desc: "Send a message, discuss terms securely, and seamlessly start creating together." },
              ].map((item) => (
                <div 
                  key={item.step} 
                  className="flex flex-col relative bg-[rgba(17,17,19,0.4)] backdrop-blur-sm border border-white/[0.04] rounded-[24px] p-8 transition-all duration-500 hover:bg-[rgba(17,17,19,0.8)] hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-default group-hover/timeline:opacity-40 hover:!opacity-100"
                >
                  <span className="font-syne text-7xl font-black text-white/[0.03] block mb-8 tracking-tighter mix-blend-overlay">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-syne text-xl font-bold mb-3 tracking-tight text-[#f0ede8]">{item.title}</h3>
                    <p className="text-[15px] text-[#6b6b72] leading-relaxed font-light">{item.desc}</p>
                  </div>
                  {/* Subtle decorative line */}
                  <div className="w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent mt-8" />
                </div>
              ))}
            </div>
          </StaggerContainer>
        </section>
        
        <FadeUp y={40}>
          <Categories />
        </FadeUp>
        
        <FadeUp y={20}>
          <Testimonials />
        </FadeUp>
        
        <section className="px-8 md:px-12 pb-32 pt-20">
          <FadeUp>
            <div className="relative bg-[rgba(17,17,19,0.6)] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] px-10 py-20 text-center overflow-hidden shadow-2xl">
              <Breathe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(232,67,26,0.1)] blur-[100px] rounded-[100%] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8431a] mb-5 inline-block border border-[rgba(232,67,26,0.3)] bg-[rgba(232,67,26,0.1)] px-4 py-1.5 rounded-full">
                  Ready to Start?
                </span>
                <h2 className="font-syne text-5xl md:text-7xl font-black tracking-tight mb-6">
                  Find your perfect <span className="text-[#e8431a]">editor</span>.
                </h2>
                <p className="text-[16px] text-[#6b6b72] mb-10 max-w-lg mx-auto font-light leading-relaxed">
                  Join hundreds of creators who found their go-to video editor on XoMA without any hassle.
                </p>
                <Link 
                  href="/editors" 
                  className="inline-flex items-center gap-2 bg-[#e8431a] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#d63a14] transition-all duration-300 shadow-[0_4px_30px_rgba(232,67,26,0.3)] hover:shadow-[0_10px_40px_rgba(232,67,26,0.5)] hover:-translate-y-1"
                >
                  Browse All Editors
                  <span className="text-xl leading-none ml-1">→</span>
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>
        <Footer />
      </div>
    </>
  );
}
