"use client";

type Severity = "High" | "Moderate" | "Low";

interface AlertSeveritySelectorProps {
  severity: Severity;
  onSelect: (severity: Severity) => void;
}

const severities: {
  value: Severity;
  label: string;
  description: string;
  color: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  {
    value: "High",
    label: "High",
    description: "Severe injuries / road blocked",
    color: "text-red-400",
    activeBg: "bg-red-500/10",
    activeBorder: "border-red-500/40",
  },
  {
    value: "Moderate",
    label: "Moderate",
    description: "Minor injuries / partial block",
    color: "text-amber-400",
    activeBg: "bg-amber-500/10",
    activeBorder: "border-amber-500/40",
  },
  {
    value: "Low",
    label: "Low",
    description: "No injuries / fender bender",
    color: "text-blue-400",
    activeBg: "bg-blue-500/10",
    activeBorder: "border-blue-500/40",
  },
];

export function AlertSeveritySelector({
  severity,
  onSelect,
}: AlertSeveritySelectorProps) {
  return (
    <div className="mb-2">
      <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 px-1">
        Severity Level
      </p>
      <div className="flex gap-2">
        {severities.map((item) => {
          const isActive = severity === item.value;
          return (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              className={`
                flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all cursor-pointer
                ${
                  isActive
                    ? `${item.activeBg} ${item.activeBorder}`
                    : "bg-[#111827] border-slate-800 hover:border-slate-700"
                }
              `}
              aria-pressed={isActive}
            >
              <span
                className={`text-sm font-semibold ${isActive ? item.color : "text-slate-400"}`}
              >
                {item.label}
              </span>
              <span className="text-slate-600 text-[10px] leading-tight">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
