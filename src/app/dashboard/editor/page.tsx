import { Activity, DollarSign, UploadCloud, Users } from "lucide-react";

export default function EditorDashboard() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-syne text-3xl font-bold tracking-tight mb-2">Editor Portal</h1>
          <p className="text-sm text-[#6b6b72] font-light">Manage your gigs, update portfolio, and adjust your availability.</p>
        </div>
        
        {/* Availability Toggle */}
        <div className="flex items-center gap-3 bg-[#111113] border border-white/[0.06] py-1.5 px-3 rounded-full">
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
           </span>
           <span className="text-xs font-bold text-[#f0ede8]">Available for Hire</span>
           <div className="w-8 h-4 bg-green-500/20 rounded-full ml-1 border border-green-500/30 flex items-center p-[1px] cursor-pointer">
             <div className="w-3.5 h-3.5 bg-green-400 rounded-full shadow-md ml-auto" />
           </div>
        </div>
      </header>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Monthly Earnings", value: "₹45,200", icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Active Gigs", value: "3", icon: Activity },
          { label: "Profile Views", value: "1.2k", icon: Users },
          { label: "Awaiting Review", value: "0", icon: UploadCloud },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between h-32 hover:border-white/[0.12] transition-colors">
            <div className="flex justify-between items-start">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg || "bg-white/[0.04]"}`}>
                <stat.icon size={16} className={stat.color || "text-[#6b6b72]"} />
              </span>
            </div>
            <div>
              <p className="font-syne text-3xl font-extrabold text-[#f0ede8]">{stat.value}</p>
              <p className="text-[11px] text-[#6b6b72] mt-1 font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upload Widget */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center items-center text-center border-dashed border-2 hover:bg-white/[0.02] cursor-pointer transition-colors min-h-[300px]">
           <div className="w-14 h-14 rounded-full bg-[#e8431a]/10 flex items-center justify-center mb-4">
              <UploadCloud size={24} className="text-[#e8431a]"/>
           </div>
           <p className="font-syne text-lg font-bold mb-1">Add to Portfolio</p>
           <p className="text-xs text-[#6b6b72] max-w-[250px] leading-relaxed">
             Drag & drop your latest edits here. Videos will instantly reflect on your public profile player.
           </p>
           <button className="mt-5 bg-[#e8431a] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-[0_4px_20px_rgba(232,67,26,0.2)]">
             Select Files
           </button>
        </div>

        {/* Current Gigs */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
          <h2 className="font-syne text-lg font-bold mb-6">Current Gigs</h2>
          
          <div className="flex-1 flex flex-col gap-3">
             <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-[#18181b]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-[#f0ede8]">Tech Channel Vlog</p>
                  <p className="text-[11px] text-[#6b6b72]">Client: BrandX</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-0.5 rounded border border-[#c9a96e]/20">In Progress</span>
                  <p className="text-[10px] text-[#6b6b72]">₹2,400</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-[#18181b]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-[#f0ede8]">Gaming Montage 4K</p>
                  <p className="text-[11px] text-[#6b6b72]">Client: ApexLegends_Daily</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded border border-[#4ade80]/20">Awaiting Feedback</span>
                  <p className="text-[10px] text-[#6b6b72]">₹800</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
