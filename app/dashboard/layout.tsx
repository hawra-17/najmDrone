import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, LogOut, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B1E2D] text-white flex flex-col border-r border-slate-800 shadow-xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50 pb-6">
          <Image
            src="/najmDark.png"
            alt="Najm Drone"
            width={100}
            height={100}
            // className="object-contain brightness-0 invert"
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white">Najm</h2>
          <p className="text-xs text-cyan-400">Drone System</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-[#0070CD] rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/incident-details"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            <FileText size={18} />
            <span>Incident Details</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700/50 bg-[#081621]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              <User size={20} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">Admin User</span>
              <span className="text-xs text-slate-400 truncate">
                admin@najm.sa
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs px-2 transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative flex flex-col">
        {/* Top Header - In the design it's part of the content area white background, but let's make a sticky header if needed. 
             The image shows a title 'Najm Drone Incident Dashboard' at top left of white area. */}
        <header className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/najmLogo.png"
              alt="Najm Drone"
              width={100}
              height={100}
              className="object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-[#0B1E2D]">
                Najm Drone Incident Dashboard
              </h1>
              <p className="text-xs text-slate-500">Welcome back, Admin</p>
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
