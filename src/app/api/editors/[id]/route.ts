import { NextRequest, NextResponse } from "next/server";
import { getEditorById } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const editor = getEditorById(id);

  if (!editor) {
    return NextResponse.json({ error: "Editor not found" }, { status: 404 });
  }

  return NextResponse.json({ data: editor });
}
