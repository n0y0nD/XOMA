"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import AtmosphericBg from "@/components/AtmosphericBg";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"creator"|"editor">("creator");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3;

  const strengthColors = ["", "#e8431a", "#f5a623", "#4ade80"];
  const strengthLabels = ["", "Weak", "Medium", "Strong"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  const inputBase = "w-full bg-[#0a090e] border rounded-xl px-4 py-3.5 text-sm text-[#f0ede8] placeholder:text-[#3a3850] outline-none transition-all duration-200 font-light";

  return (
    <>
      <AtmosphericBg ghostWord="JOIN" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-[460px]">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0e0d14 0%, #111018 50%, #0d0c14 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
              }}
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl"
                style={{ background: "rgba(110,100,220,0.1)" }} />

              <div className="relative px-8 pt-10 pb-8">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-3 h-3 rounded-full bg-[#e8431a] animate-pulse" />
                  <span className="font-syne text-lg font-extrabold text-[#f0ede8] tracking-tight">XoMA</span>
                </div>

                <h1 className="font-syne text-[32px] font-bold text-center text-[#f0ede8] tracking-tight mb-1">
                  Create account
                </h1>
                <p className="text-sm text-center text-[#6b6b72] mb-7 font-light">
                  Join XoMA and start creating
                </p>

                {/* Role toggle */}
                <div className="relative flex bg-[#0a090e] border border-white/[0.07] rounded-xl p-1 mb-6">
                  <div
                    className="absolute top-1 bottom-1 rounded-lg transition-all duration-300"
                    style={{
                      background: "#e8431a",
                      left: role === "creator" ? "4px" : "50%",
                      right: role === "creator" ? "50%" : "4px",
                      boxShadow: "0 4px 20px rgba(232,67,26,0.35)",
                    }}
                  />
                  {(["creator","editor"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className="relative flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 z-10"
                      style={{ color: role === r ? "#fff" : "#6b6b72" }}
                    >
                      {r === "creator" ? "I'm a Creator" : "I'm an Editor"}
                    </button>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06] mb-6" />

                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✓</span>
                    </div>
                    <p className="font-syne text-xl font-bold text-[#f0ede8] mb-2">Account created!</p>
                    <p className="text-sm text-[#6b6b72] mb-6">Welcome to XoMA.</p>
                    <Link href="/" className="inline-block bg-[#e8431a] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-85 transition-opacity">
                      Go to homepage
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      {[["firstName","First name"],["lastName","Last name"]].map(([name,ph]) => (
                        <div key={name} className="relative">
                          <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3a3850]" />
                          <input
                            name={name}
                            placeholder={ph}
                            value={form[name as keyof typeof form]}
                            onChange={handleChange}
                            required
                            className={`${inputBase} pl-9 border-white/[0.07] focus:border-[#e8431a]/50`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3a3850]" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`${inputBase} pl-10 border-white/[0.07] focus:border-[#e8431a]/50`}
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3a3850]" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className={`${inputBase} pl-10 pr-10 border-white/[0.07] focus:border-[#e8431a]/50`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3a3850] hover:text-[#6b6b72] transition-colors">
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    {/* Strength bar */}
                    {form.password.length > 0 && (
                      <div className="flex items-center gap-2 -mt-1">
                        <div className="flex gap-1.5 flex-1">
                          {[1,2,3].map((s) => (
                            <div key={s} className="flex-1 h-1 rounded-full transition-all duration-300"
                              style={{ background: strength >= s ? strengthColors[strength] : "rgba(255,255,255,0.08)" }} />
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: strengthColors[strength] }}>
                          {strengthLabels[strength]}
                        </span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="relative w-full py-3.5 rounded-xl text-sm font-semibold text-white mt-1 transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #e8431a 0%, #c8350e 100%)",
                        boxShadow: "0 8px 30px rgba(232,67,26,0.4)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-xl pointer-events-none" />
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating account…
                        </span>
                      ) : "Create Account"}
                    </button>

                    <p className="text-center text-xs text-[#3a3850]">
                      By signing up you agree to our{" "}
                      <Link href="#" className="text-[#6b6b72] hover:text-[#f0ede8] transition-colors">Terms</Link>
                      {" & "}
                      <Link href="#" className="text-[#6b6b72] hover:text-[#f0ede8] transition-colors">Privacy Policy</Link>
                    </p>
                  </form>
                )}

                <p className="text-center text-sm text-[#4a4860] mt-6">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#e8431a] hover:text-[#f05530] font-medium transition-colors">
                    Log in
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
