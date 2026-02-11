"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

export function AlertHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 pt-6 pb-2">
      <div className="flex items-center gap-3">
        <Image
          src="/najmDark.png"
          alt="Najm Drone"
          width={40}
          height={40}
          className="object-contain"
        />
        <div>
          <h1 className="text-slate-100 text-base font-bold tracking-tight">
            Najm Alert
          </h1>
          <p className="text-slate-500 text-xs">Emergency Reporting</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center">
        <Bell className="w-4 h-4 text-slate-400" />
      </div>
    </header>
  );
}
