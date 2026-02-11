"use client";

import { AlertTriangle, MapPin, X, Send } from "lucide-react";

type Severity = "High" | "Moderate" | "Low";

interface AlertConfirmationProps {
  severity: Severity;
  location: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const severityColors: Record<Severity, string> = {
  High: "text-red-400",
  Moderate: "text-amber-400",
  Low: "text-blue-400",
};

export function AlertConfirmation({
  severity,
  location,
  onConfirm,
  onCancel,
}: AlertConfirmationProps) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 space-y-5">
        {/* Warning icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-slate-100 text-lg font-bold">
            Confirm Emergency Alert
          </h3>
          <p className="text-slate-400 text-sm">
            This will notify Najm dispatch and deploy a drone to your location.
          </p>
        </div>

        {/* Alert details */}
        <div className="bg-[#0a0f1a] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs uppercase tracking-wider">
              Severity
            </span>
            <span className={`text-sm font-semibold ${severityColors[severity]}`}>
              {severity}
            </span>
          </div>
          <div className="border-t border-slate-800" />
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-wider shrink-0">
              Location
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="text-slate-300 text-xs font-mono text-right">
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium transition-colors hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 text-white text-sm font-bold transition-all hover:bg-red-500 active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            <Send className="w-4 h-4" />
            Send Alert
          </button>
        </div>
      </div>
    </div>
  );
}
