"use client"; // For Lucide icons sometimes needed if importing dynamically, but safe static here.

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Activity,
  Clock,
  Battery,
  Wifi,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

interface IncidentNotification {
  id: string;
  incident_id: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  time: string;
  created_at: string;
  status: "Active" | "Resolved" | "Pending";
}

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
  const [notifications, setNotifications] = useState<IncidentNotification[]>(
    [],
  );
  const [todayIncidents, setTodayIncidents] = useState<IncidentNotification[]>(
    [],
  );
  const [selectedAlert, setSelectedAlert] =
    useState<IncidentNotification | null>(null);

  // Get today's date range
  const getTodayDateRange = () => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    return {
      startOfDay: startOfDay.toISOString(),
      endOfDay: endOfDay.toISOString(),
    };
  };

  // Calculate time until midnight for reset
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    return tomorrow.getTime() - now.getTime();
  };

  useEffect(() => {
    const fetchLatestNotifications = async () => {
      // Fetch latest 5 for the notification list
      const { data: listData, error: listError } = await supabase
        .from("incidents")
        .select(
          "id, incident_id, location, latitude, longitude, time, created_at, status",
        )
        .order("created_at", { ascending: false })
        .limit(5);

      if (listError) {
        console.error("Failed to fetch notifications:", listError);
        return;
      }

      setNotifications((listData as IncidentNotification[]) || []);

      // Fetch all today's incidents for the map
      const { startOfDay, endOfDay } = getTodayDateRange();
      const { data: mapData, error: mapError } = await supabase
        .from("incidents")
        .select(
          "id, incident_id, location, latitude, longitude, time, created_at, status",
        )
        .gte("created_at", startOfDay)
        .lt("created_at", endOfDay)
        .order("created_at", { ascending: false });

      if (mapError) {
        console.error("Failed to fetch today's incidents:", mapError);
        return;
      }

      setTodayIncidents((mapData as IncidentNotification[]) || []);
    };

    fetchLatestNotifications();

    // Set up midnight reset timer
    const timeUntilMidnight = getTimeUntilMidnight();
    const midnightTimer = setTimeout(() => {
      setTodayIncidents([]); // Clear today's incidents at midnight
      fetchLatestNotifications(); // Refetch for new day
    }, timeUntilMidnight);

    const channel = supabase
      .channel("incident-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "incidents",
        },
        (payload) => {
          const newIncident = payload.new as IncidentNotification;

          // Add to notifications list
          setNotifications((prev) => [newIncident, ...prev].slice(0, 5));

          // Add to today's incidents if it's from today
          const { startOfDay, endOfDay } = getTodayDateRange();
          const incidentTime = new Date(newIncident.created_at).getTime();
          if (
            incidentTime >= new Date(startOfDay).getTime() &&
            incidentTime < new Date(endOfDay).getTime()
          ) {
            setTodayIncidents((prev) => [newIncident, ...prev]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      clearTimeout(midnightTimer);
    };
  }, []);

  const getStatusColor = (
    status: "Active" | "Resolved" | "Pending",
  ): string => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-700 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleNotificationClick = async (
    notification: IncidentNotification,
  ) => {
    setSelectedAlert(notification);

    // Only update if status is not already Active
    if (notification.status === "Active") {
      return;
    }

    const { error } = await supabase
      .from("incidents")
      .update({ status: "Active" })
      .eq("id", notification.id);

    if (error) {
      console.error("Failed to update incident status:", error);
      return;
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, status: "Active" } : item,
      ),
    );
    setSelectedAlert((prev) =>
      prev && prev.id === notification.id
        ? { ...prev, status: "Active" }
        : prev,
    );
  };

  const formatNotificationTime = (notification: IncidentNotification) => {
    if (notification.time) {
      return notification.time.slice(0, 5);
    }

    if (notification.created_at) {
      return new Date(notification.created_at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    return "--:--";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Incidents (Eastern Province)"
          value="140"
          icon={AlertCircle}
        />
        <StatCard title="Active Incidents" value="8" icon={Activity} />
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
          <CardContent className="flex-1 relative p-0 overflow-hidden bg-[#f0f0f0] min-h-87.5">
            <IncidentMap
              todayIncidents={todayIncidents}
              focusedAlert={
                selectedAlert &&
                selectedAlert.latitude &&
                selectedAlert.longitude
                  ? {
                      incidentId: selectedAlert.incident_id,
                      location: selectedAlert.location,
                      latitude: selectedAlert.latitude,
                      longitude: selectedAlert.longitude,
                      status: selectedAlert.status,
                    }
                  : null
              }
            />
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
        <CardContent className="text-sm">
          {notifications.length === 0 ? (
            <div className="h-20 flex items-center justify-center text-slate-400">
              No active alerts at the moment
            </div>
          ) : (
            <div className="space-y-2 py-1">
              {notifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors cursor-pointer ${
                    selectedAlert?.id === notification.id
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="min-w-0 pr-4 flex-1">
                    <p className="text-slate-700 truncate font-medium text-sm">
                      {notification.location || "Unknown location"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
                          notification.status,
                        )}`}
                      >
                        {notification.status}
                      </span>
                      {notification.status !== "Active" && (
                        <span className="text-xs text-blue-600 font-semibold">
                          Click to activate
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-slate-500 shrink-0 ml-2">
                    {formatNotificationTime(notification)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

function StatCard({ title, value, icon: Icon }: StatCardProps) {
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

type StatusRowProps = {
  label: string;
  value: string;
  icon: React.ComponentType<{
    size?: number;
    style?: React.CSSProperties;
    className?: string;
  }>;
  iconColor?: string;
  hasShadow?: boolean;
};

function StatusRow({
  label,
  value,
  icon: Icon,
  iconColor,
  hasShadow,
}: StatusRowProps) {
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
