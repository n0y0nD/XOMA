import { NextRequest, NextResponse } from "next/server";
import { searchEditors } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const editors = searchEditors({
    search:  searchParams.get("search")  ?? undefined,
    service: searchParams.get("service") ?? undefined,
    maxRate: searchParams.get("maxRate") ? Number(searchParams.get("maxRate")) : undefined,
  });

  return NextResponse.json({ data: editors });
}
