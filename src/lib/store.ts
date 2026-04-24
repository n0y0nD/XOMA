import type { Editor, ContactFormData } from "@/types";
import editorsData from "./data/editors.json";
import fs from "fs";
import path from "path";

// ── Editors ──────────────────────────────────────────────

export function getAllEditors(): Editor[] {
  return editorsData as Editor[];
}

export function getEditorById(id: string): Editor | null {
  const editors = getAllEditors();
  return editors.find((e) => e._id === id) ?? null;
}

export function searchEditors(params: {
  search?: string;
  service?: string;
  maxRate?: number;
}): Editor[] {
  let editors = getAllEditors();

  if (params.search) {
    const s = params.search.toLowerCase();
    editors = editors.filter(
      (e) =>
        e.name.toLowerCase().includes(s) ||
        e.role.toLowerCase().includes(s) ||
        e.skills.some((sk) => sk.toLowerCase().includes(s))
    );
  }

  if (params.service) {
    const s = params.service.toLowerCase();
    editors = editors.filter((e) =>
      e.skills.some((sk) => sk.toLowerCase().includes(s))
    );
  }

  if (params.maxRate) {
    editors = editors.filter((e) => e.rate <= params.maxRate!);
  }

  return editors.sort((a, b) => b.rating - a.rating);
}

// ── Contacts ─────────────────────────────────────────────

const CONTACTS_PATH = path.join(process.cwd(), "src/lib/data/contacts.json");

export function saveContact(data: ContactFormData): void {
  const existing = JSON.parse(fs.readFileSync(CONTACTS_PATH, "utf-8"));
  existing.push({ ...data, id: Date.now().toString(), createdAt: new Date().toISOString() });
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(existing, null, 2));
}
