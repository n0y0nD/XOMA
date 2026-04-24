import { NextRequest, NextResponse } from "next/server";
import { saveContact } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, editorId } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email and message are required" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  saveContact({ name, email, message, editorId });

  return NextResponse.json({ data: { ok: true } }, { status: 201 });
}
