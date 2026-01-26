"use client"; // For Lucide icons sometimes needed if importing dynamically, but safe static here.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Activity,
  Clock,
  Battery,
  Wifi,
  Navigation,
  Podcast,
  LocateFixed,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Incidents (Eastern Province)"
          value="140"
          icon={AlertCircle}
        />
        <StatCard title="Active Incidents" value="8" icon={Activity} trend />
        <StatCard title="Last Update" value="2 mins ago" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 flex flex-col shadow-sm border-slate-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              Eastern Province - Incident Map
            </CardTitle>
            <p className="text-xs text-slate-400">
              Dammam, AlKhobar, AlDhahran Region
            </p>
          </CardHeader>
          <CardContent className="flex-1 relative p-0 overflow-hidden bg-[#f0f0f0] min-h-[350px]">
            {/* Map Placeholder - grayscale map style */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e8e8e8' width='400' height='300'/%3E%3Cpath d='M0 50h400M0 100h400M0 150h400M0 200h400M0 250h400' stroke='%23ddd' stroke-width='1'/%3E%3Cpath d='M50 0v300M100 0v300M150 0v300M200 0v300M250 0v300M300 0v300M350 0v300' stroke='%23ddd' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: "cover",
              }}
            />

            {/* Pins */}
            <div className="absolute top-[40%] left-[35%]">
              <span className="w-2.5 h-2.5 block rounded-full bg-blue-500"></span>
            </div>
            <div className="absolute top-[50%] left-[55%]">
              <span className="w-3 h-3 block rounded-full bg-red-500"></span>
            </div>
            <div className="absolute top-[55%] left-[45%]">
              <span className="w-2.5 h-2.5 block rounded-full bg-blue-500"></span>
            </div>
            <div className="absolute top-[60%] left-[40%]">
              <span className="w-2.5 h-2.5 block rounded-full bg-blue-500"></span>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded shadow text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-slate-700">Active Incident</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-slate-700">Reported Incidents</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drone Status */}
        <Card className="shadow-sm border-slate-200 bg-white flex flex-col">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-bold text-slate-800">
              Drone Status
            </CardTitle>
            <div className="text-slate-400">
              <LocateFixed size={20} />
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-5 flex-1 flex flex-col">
            <StatusRow label="Battery" value="87%" icon={Battery} />
            <StatusRow label="Connection" value="Strong" icon={Wifi} />
            <StatusRow
              label="GPS Location"
              value="26.3927°N, 50.0132°E"
              icon={LocateFixed}
            />
            <StatusRow label="Current Mode" value="Standby" icon={Activity} />

            <div className="mt-auto pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                <span className="text-slate-600 text-sm">Status</span>
                <span className="bg-[#10b981] text-white text-xs px-4 py-1 rounded font-semibold">
                  Online
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="shadow-sm border-slate-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-slate-800">
            Real-time Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="h-20 flex items-center justify-center text-slate-400 text-sm">
          No active alerts at the moment
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="shadow-sm border-slate-200 bg-white">
      <CardContent className="p-5 flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
        </div>
        <div className="text-slate-400">
          {trend ? <Activity size={22} /> : <Icon size={22} />}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-slate-600">
        <Icon size={16} className="text-slate-400" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm text-slate-800 font-medium">{value}</span>
    </div>
  );
}
