import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-slate-100 overflow-hidden font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {/* Using a generic car image from unsplash as placeholder to match the vibe */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        {/* Gradient Overlay to darken */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-slate-900/60" />
      </div>

      {/* Content Card wrapper */}
      <div className="relative z-10 w-full max-w-[480px] p-4">{children}</div>
    </div>
  );
}
