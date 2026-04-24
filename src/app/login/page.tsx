"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AtmosphericBg from "@/components/AtmosphericBg";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Placeholder — wire up real auth here
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("error");
  }

  const inputBase = "w-full bg-[#0a090e] border rounded-xl px-4 py-3.5 text-sm text-[#f0ede8] placeholder:text-[#3a3850] outline-none transition-all duration-200 font-light";

  return (
    <>
      <AtmosphericBg ghostWord="LOGIN" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-[460px]">

            {/* Card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0e0d14 0%, #111018 50%, #0d0c14 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Inner top glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl"
                style={{ background: "rgba(232,67,26,0.12)" }} />

              <div className="relative px-8 pt-10 pb-8">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-3 h-3 rounded-full bg-[#e8431a] animate-pulse" />
                  <span className="font-syne text-lg font-extrabold text-[#f0ede8] tracking-tight">XoMA</span>
                </div>

                {/* Title */}
                <h1 className="font-syne text-[32px] font-bold text-center text-[#f0ede8] tracking-tight mb-1">
                  Welcome back
                </h1>
                <p className="text-sm text-center text-[#6b6b72] mb-7 font-light">
                  Sign in to continue to XoMA
                </p>

                <div className="h-px bg-white/[0.06] mb-7" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Email */}
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3a3850]" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`${inputBase} pl-10 border-white/[0.07] focus:border-[#e8431a]/50 focus:shadow-[0_0_0_3px_rgba(232,67,26,0.08)]`}
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3a3850]" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={`${inputBase} pl-10 pr-10 border-white/[0.07] focus:border-[#e8431a]/50 focus:shadow-[0_0_0_3px_rgba(232,67,26,0.08)]`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3a3850] hover:text-[#6b6b72] transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Forgot */}
                  <div className="flex justify-end -mt-1">
                    <Link href="#" className="text-xs text-[#7068c8] hover:text-[#9088e8] transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-xs text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
                      Invalid email or password. Try again.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #e8431a 0%, #c8350e 100%)",
                      boxShadow: "0 8px 30px rgba(232,67,26,0.4)",
                    }}
                  >
                    {/* Shine */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-xl pointer-events-none" />
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in…
                      </span>
                    ) : "Log in"}
                  </button>
                </form>

                {/* OR */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-xs text-[#3a3850]">or continue with</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Google",   color: "#4285f4" },
                    { label: "Facebook", color: "#4267b2" },
                    { label: "Apple",    color: "#a0a0a8" },
                  ].map(({ label, color }) => (
                    <button
                      key={label}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium text-[#8a8898] hover:text-[#f0ede8] transition-all duration-200 hover:border-white/[0.12]"
                      style={{
                        background: "#0a090e",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Sign up */}
                <p className="text-center text-sm text-[#4a4860] mt-6">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[#e8431a] hover:text-[#f05530] font-medium transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
