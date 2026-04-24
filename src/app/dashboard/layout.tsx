import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0b] overflow-hidden text-[#f0ede8] font-sans">
      {/* Sidebar fixed to left */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle background glow for dashboards */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[rgba(232,67,26,0.03)] blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"
        />
        
        <div className="px-10 py-12 max-w-6xl relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
