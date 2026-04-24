import { Clock, CheckCircle, Video, MessageCircle } from "lucide-react";

export default function ClientDashboard() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="font-syne text-3xl font-bold tracking-tight mb-2">Welcome Back, BrandX</h1>
        <p className="text-sm text-[#6b6b72] font-light">Here's an overview of your active video projects and freelancer activity.</p>
      </header>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "2", icon: Video },
          { label: "Needs Approval", value: "1", icon: CheckCircle, color: "text-[#e8431a]", bg: "bg-[#e8431a]/10" },
          { label: "Hours Unbilled", value: "14", icon: Clock },
          { label: "Unread Messages", value: "3", icon: MessageCircle },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between h-32 hover:border-white/[0.12] transition-colors">
            <div className="flex justify-between items-start">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg || "bg-white/[0.04]"}`}>
                <stat.icon size={16} className={stat.color || "text-[#6b6b72]"} />
              </span>
            </div>
            <div>
              <p className="font-syne text-3xl font-extrabold text-[#f0ede8]">{stat.value}</p>
              <p className="text-xs text-[#6b6b72] mt-1 font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Projects List */}
        <div className="lg:col-span-2 bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-syne text-lg font-bold">In-Progress Projects</h2>
            <button className="text-[11px] font-medium text-[#e8431a] hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* Mock Project 1 */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-[#18181b] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <Video size={16} className="text-[#c9a96e]" />
                 </div>
                 <div>
                   <p className="font-syne text-sm font-bold text-[#f0ede8]">Tech Channel Vlog.mp4</p>
                   <p className="text-[11px] text-[#6b6b72] mt-0.5">Editor: Rahul Das • Due in 2 days</p>
                 </div>
              </div>
              <span className="text-[10px] font-medium px-2 py-1 rounded bg-[#e8431a]/10 text-[#e8431a] border border-[#e8431a]/20">
                Awaiting Approval
              </span>
            </div>

            {/* Mock Project 2 */}
             <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-[#18181b] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <Video size={16} className="text-[#6b6b72]" />
                 </div>
                 <div>
                   <p className="font-syne text-sm font-bold text-[#f0ede8]">React Course Intro</p>
                   <p className="text-[11px] text-[#6b6b72] mt-0.5">Editor: Arnav Hazarika • In Progress</p>
                 </div>
              </div>
              <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/[0.06] text-[#6b6b72] border border-white/[0.05]">
                Editing
              </span>
            </div>
          </div>
        </div>

        {/* Message Widget */}
        <div className="lg:col-span-1 bg-[#111113] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
          <h2 className="font-syne text-lg font-bold mb-6">Recent Messages</h2>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center font-syne text-xs font-bold text-[#e8431a] border border-[#e8431a]/20 shrink-0">
                RD
              </div>
              <div>
                <p className="text-xs font-bold text-[#f0ede8]">Rahul Das <span className="text-[9px] text-[#6b6b72] font-normal ml-1">2h ago</span></p>
                <p className="text-[11px] text-[#6b6b72] mt-1 leading-snug">I've uploaded the final draft. Let me know if you need any revisions!</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-[#f0ede8] py-2.5 rounded-lg border border-white/[0.06] transition-all">
            Open Inbox
          </button>
        </div>

      </div>
    </div>
  );
}
