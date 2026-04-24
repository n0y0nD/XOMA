"use client";

export default function AtmosphericBg({ ghostWord = "XOMA" }: { ghostWord?: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Crosshatch diagonal grid */}
      <svg className="absolute inset-0 w-full h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="crosshatch" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="rgba(255,255,255,0.025)" strokeWidth="0.8"/>
            <line x1="0" y1="0" x2="28" y2="0" stroke="rgba(255,255,255,0.018)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crosshatch)" />
      </svg>

      {/* Ghost text — large watermark */}
      <div
        className="absolute left-8 top-1/4 font-syne font-extrabold select-none leading-none tracking-tighter pointer-events-none"
        style={{
          fontSize: "clamp(120px, 14vw, 200px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          userSelect: "none",
        }}
      >
        {ghostWord}
      </div>

      <div
        className="absolute right-16 bottom-16 font-syne font-extrabold select-none leading-none tracking-tighter pointer-events-none"
        style={{
          fontSize: "clamp(60px, 8vw, 110px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          userSelect: "none",
        }}
      >
        EDITORS
      </div>

      {/* Left radial glow — orange */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "700px", height: "700px",
          left: "-200px", top: "50%",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle, rgba(232,67,26,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Right radial glow — purple */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px", height: "600px",
          right: "-100px", top: "40%",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle, rgba(110,100,220,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "500px", height: "300px",
          left: "10%", bottom: "-100px",
          background: "radial-gradient(ellipse, rgba(232,67,26,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
