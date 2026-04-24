import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Editor } from "@/types";
import ReviewSlider from "@/components/ReviewSlider";

interface Props {
  params: Promise<{ id: string }>;
}

async function getEditor(id: string): Promise<Editor | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/editors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function EditorProfilePage({ params }: Props) {
  const { id } = await params;
  const editor = await getEditor(id);

  if (!editor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-syne text-2xl font-bold mb-3">Editor not found</p>
          <Link href="/editors" className="text-sm text-[#6b6b72] hover:text-[#f0ede8] transition-colors">
            ← Back to editors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10">
        <Navbar />

        <div className="pt-28 px-8 md:px-12 pb-24 max-w-5xl mx-auto">
          {/* Back */}
          <Link
            href="/editors"
            className="inline-flex items-center gap-2 text-sm text-[#6b6b72] hover:text-[#f0ede8] transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Back to editors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — profile info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Header card */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#18181b] border border-white/[0.06] flex items-center justify-center font-syne text-xl font-bold shrink-0">
                    {editor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="font-syne text-2xl font-bold tracking-tight">{editor.name}</h1>
                      {editor.available && (
                        <span className="flex items-center gap-1.5 bg-green-900/30 border border-green-600/30 text-green-400 text-[10px] font-medium px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Available Now
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6b6b72] mt-1">{editor.role}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <span className="font-syne text-xl font-bold">
                        ₹{editor.rate.toLocaleString("en-IN")}
                        <span className="font-sans text-xs font-light text-[#6b6b72]">/hr</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-[#6b6b72]">
                        <Star size={13} fill="#c9a96e" className="text-[#c9a96e]" />
                        {editor.rating.toFixed(1)} ({editor.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {editor.bio && (
                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7">
                  <h2 className="font-syne text-base font-semibold mb-3">About</h2>
                  <p className="text-sm text-[rgba(240,237,232,0.5)] leading-relaxed font-light">
                    {editor.bio}
                  </p>
                </div>
              )}

              {/* Skills */}
              {editor.skills.length > 0 && (
                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7">
                  <h2 className="font-syne text-base font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {editor.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 bg-[#18181b] border border-white/[0.06] rounded-full text-[rgba(240,237,232,0.5)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Slider */}
              <ReviewSlider reviews={editor.reviews || []} />
            </div>

            {/* Right — contact */}
            <div className="lg:col-span-1">
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sticky top-24">
                <h2 className="font-syne text-base font-semibold mb-5">Get in Touch</h2>
                <ContactForm editorId={editor._id} editorName={editor.name} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
