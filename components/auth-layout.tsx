import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-slate-100 overflow-hidden font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/najmBackground.png")',
          }}
        />
        {/* Gradient Overlay to darken slightly */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Card wrapper */}
      <div className="relative z-10 w-full max-w-[480px] p-4">{children}</div>
    </div>
  );
}
