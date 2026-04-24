import Navbar from "@/components/Navbar";
import EditorCard from "@/components/EditorCard";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import AtmosphericBg from "@/components/AtmosphericBg";
import type { Editor } from "@/types";

interface Props {
  searchParams: Promise<{ search?: string; service?: string; maxRate?: string }>;
}

async function getEditors(params: { search?: string; service?: string; maxRate?: string }): Promise<Editor[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => Boolean(v))) as Record<string, string>
    ).toString();
    const res = await fetch(`${baseUrl}/api/editors${qs ? `?${qs}` : ""}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function EditorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const editors = await getEditors(params);

  return (
    <>
      <AtmosphericBg ghostWord="EDITORS" />

      <div className="relative z-10">
        <Navbar />

        <div className="pt-28 px-8 md:px-12 pb-10">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b6b72] block mb-2">
            All Talent
          </span>
          <h1 className="font-syne text-4xl font-bold tracking-tight mb-10">
            Browse <span className="text-[#c9a96e]">Editors</span>
          </h1>
        </div>

        <SearchBar />

        <section className="px-8 md:px-12 pb-24">
          {editors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {editors.map((editor, i) => (
                <EditorCard key={editor._id} editor={editor} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-syne text-2xl font-bold mb-3">No editors found</p>
              <p className="text-sm text-[#6b6b72]">Try adjusting your search or filters.</p>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
