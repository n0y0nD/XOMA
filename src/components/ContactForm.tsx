"use client";

import { useState } from "react";
import type { ContactFormData } from "@/types";

interface Props {
  editorId?: string;
  editorName?: string;
}

export default function ContactForm({ editorId, editorName }: Props) {
  const [form, setForm] = useState<ContactFormData>({
    name: "", email: "", message: "", editorId,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "", editorId });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#18181b] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-[#f0ede8] placeholder:text-[#6b6b72] outline-none focus:border-white/[0.2] transition-colors duration-200 font-light";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {editorName && (
        <p className="text-sm text-[#6b6b72]">
          Sending message to <span className="text-[#f0ede8]">{editorName}</span>
        </p>
      )}

      <input
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Describe your project…"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#e8431a] text-white text-sm font-medium py-3 rounded-lg hover:opacity-85 transition-opacity disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-400 text-center">Message sent! We'll be in touch.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
