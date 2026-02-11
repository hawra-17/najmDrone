"use client";

import { Radio, ShieldCheck, ShieldAlert, Wifi } from "lucide-react";

type AlertPhase = "idle" | "confirming" | "sending" | "sent";

interface AlertStatusBarProps {
  phase: AlertPhase;
}

const phaseConfig = {
  idle: {
    label: "Ready",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    Icon: ShieldCheck,
  },
  confirming: {
    label: "Confirm Alert",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    Icon: ShieldAlert,
  },
  sending: {
    label: "Transmitting",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    Icon: Radio,
  },
  sent: {
    label: "Alert Delivered",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    Icon: ShieldCheck,
  },
};

export function AlertStatusBar({ phase }: AlertStatusBarProps) {
  const config = phaseConfig[phase];
  const { Icon } = config;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl ${config.bg} border ${config.border} mb-4`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-slate-500 text-xs">Connected</span>
      </div>
    </div>
  );
}
