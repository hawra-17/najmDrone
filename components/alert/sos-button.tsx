"use client";

import { useState } from "react";

interface AlertSosButtonProps {
  onPress: () => void;
}

export function AlertSosButton({ onPress }: AlertSosButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Outer pulse ring */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="absolute -inset-4 rounded-full border-2 border-red-500/20 animate-pulse" />
        <div className="absolute -inset-8 rounded-full border border-red-500/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
        
        {/* Main SOS button */}
        <button
          onClick={onPress}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          className={`
            relative w-44 h-44 rounded-full
            bg-gradient-to-b from-red-500 to-red-700
            shadow-[0_0_40px_rgba(220,38,38,0.4),0_8px_32px_rgba(0,0,0,0.4)]
            flex items-center justify-center
            transition-all duration-150 cursor-pointer
            active:scale-95 active:shadow-[0_0_20px_rgba(220,38,38,0.3),0_4px_16px_rgba(0,0,0,0.4)]
            ${isPressed ? "scale-95" : "scale-100"}
          `}
          aria-label="Send SOS emergency alert"
        >
          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border-2 border-red-400/40" />
          
          {/* Text content */}
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-white tracking-wider">SOS</span>
            <span className="text-red-200 text-xs font-medium mt-1 uppercase tracking-widest">
              Tap to Alert
            </span>
          </div>
        </button>
      </div>

      <p className="text-slate-500 text-sm text-center max-w-[200px]">
        Press to report an accident at your current location
      </p>
    </div>
  );
}
