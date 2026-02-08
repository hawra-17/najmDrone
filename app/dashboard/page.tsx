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
  MapPin,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const IncidentMap = dynamic(() => import("@/components/incident-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <span className="text-slate-500">Loading map...</span>
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Incidents (Eastern Province)"
          value="140"
          icon={AlertCircle}
          iconColor="#1f72ea"
        />
        <StatCard
          title="Active Incidents"
          value="8"
          icon={Activity}
          trend
          iconColor="#1f72ea"
        />
        <StatCard
          title="Last Update"
          value="2 mins ago"
          icon={Clock}
          iconColor="#1f72ea"
        />
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
            <IncidentMap />
          </CardContent>
        </Card>

        {/* Drone Status */}
        <Card className="shadow-sm border-slate-200 bg-white flex flex-col">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-bold text-slate-800">
              Drone Status
            </CardTitle>
            <div className="text-slate-400">
              <Image src="/drone1.png" alt="Drone" width={80} height={80} />
            </div>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col">
            <div className="">
              <StatusRow
                label="Battery"
                value="87%"
                icon={Battery}
                iconColor="#1caf29"
                hasShadow
              />
            </div>
            <StatusRow
              label="Connection"
              value="Strong"
              icon={Wifi}
              iconColor="#1caf29"
              hasShadow
            />
            <StatusRow
              label="GPS Location"
              value="26.3927°N, 50.0132°E"
              icon={MapPin}
              iconColor="#1f72ea"
              hasShadow
            />
            <StatusRow
              label="Current Mode"
              value="Standby"
              icon={Activity}
              iconColor="#1f72ea"
              hasShadow
            />

            <div className="mt-auto pt-4">
              <div className="bg-white border-2 border-blue-400 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <span className="text-slate-700 text-sm font-medium">
                  Status
                </span>
                <span className="bg-[#22c55e] text-white text-sm px-5 py-1.5 rounded-full font-semibold">
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

function StatCard({ title, value, icon: Icon, trend, iconColor }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-[#1e3a5f] mt-2">{value}</p>
          </div>
          <Icon className="h-6 w-6 text-[#2563eb]" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusRow({ label, value, icon: Icon, iconColor, hasShadow }: any) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl mb-3 overflow-hidden ${
        hasShadow ? "bg-slate-50" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-slate-600 shrink-0">
        <Icon
          size={20}
          style={{ color: iconColor || undefined }}
          className={iconColor ? "" : "text-slate-400"}
        />
        <span className="text-sm whitespace-nowrap">{label}</span>
      </div>
      <span className="text-sm text-slate-800 font-medium truncate ml-2">
        {value}
      </span>
    </div>
  );
}
