"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, MapPin, Clock, Radio } from "lucide-react";

interface PhoneAlert {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  severity: string;
  address: string;
  timestamp: string;
  status: string;
}

export function AlertNotifications() {
  const [alerts, setAlerts] = useState<PhoneAlert[]>([]);
  const [lastPoll, setLastPoll] = useState<string>("--");

  // Poll for new alerts every 5 seconds
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch("/api/alerts");
        if (res.ok) {
          const data = await res.json();
          setAlerts(data.alerts || []);
        }
      } catch {
        // Silently fail
      }
      setLastPoll(new Date().toLocaleTimeString());
    };

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, []);

  const severityColor: Record<string, string> = {
    High: "bg-red-100 text-red-700 border-red-200",
    Moderate: "bg-orange-100 text-orange-700 border-orange-200",
    Low: "bg-teal-100 text-teal-700 border-teal-200",
  };

  const severityDot: Record<string, string> = {
    High: "bg-red-500",
    Moderate: "bg-orange-500",
    Low: "bg-teal-500",
  };

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 gap-2">
        <Radio className="w-5 h-5 text-slate-300" />
        <p className="text-slate-400 text-sm">No active phone alerts</p>
        <p className="text-slate-300 text-xs">
          Last checked: {lastPoll}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {alerts.length} active alert{alerts.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Updated: {lastPoll}
        </span>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {alerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityDot[alert.severity] || "bg-slate-400"}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">
                  {alert.id}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium border ${severityColor[alert.severity] || "bg-slate-100 text-slate-600"}`}
                >
                  {alert.severity}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{alert.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <Clock className="w-3 h-3 shrink-0" />
                <span>
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
