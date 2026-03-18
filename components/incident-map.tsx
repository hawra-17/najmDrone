"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface FocusedAlert {
  incidentId: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "Active" | "Resolved" | "Pending";
}

interface IncidentMapProps {
  todayIncidents?: Array<{
    id: string;
    incident_id: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    status: "Active" | "Resolved" | "Pending";
  }> | null;
  focusedAlert?: FocusedAlert | null;
}

export default function IncidentMap({
  todayIncidents = null,
  focusedAlert = null,
}: IncidentMapProps) {
  return (
    <MapContent todayIncidents={todayIncidents} focusedAlert={focusedAlert} />
  );
}

function MapContent({
  todayIncidents,
  focusedAlert,
}: {
  todayIncidents: Array<{
    id: string;
    incident_id: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    status: "Active" | "Resolved" | "Pending";
  }> | null;
  focusedAlert: FocusedAlert | null;
}) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!L) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <span className="text-slate-500">Loading map...</span>
      </div>
    );
  }

  // Custom icons for markers - uses dynamic icon based on status

  const getFocusedIcon = (status: "Active" | "Resolved" | "Pending") => {
    let color: string;
    switch (status) {
      case "Active":
        color = "#ef4444"; // Red for Active
        break;
      case "Resolved":
        color = "#22c55e"; // Green for Resolved
        break;
      case "Pending":
        color = "#eab308"; // Yellow for Pending
        break;
      default:
        color = "#2563eb"; // Blue default
    }

    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 26px;
        height: 26px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.35);
      "></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });
  };

  // Center on Eastern Province (between Dammam, AlKhobar, and Dhahran)
  const center: [number, number] = [26.3927, 50.0632];

  const focusedPosition: [number, number] | null = focusedAlert
    ? [focusedAlert.latitude, focusedAlert.longitude]
    : null;

  return (
    <>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {focusedPosition && (
          <FocusedMapController position={focusedPosition} zoom={14} />
        )}

        {todayIncidents &&
          todayIncidents
            .filter((incident) => incident.latitude && incident.longitude)
            .map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.latitude!, incident.longitude!]}
                icon={getFocusedIcon(incident.status)}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{incident.incident_id}</strong>
                    <br />
                    <p className="text-xs text-slate-600">
                      {incident.location}
                    </p>
                    <span
                      className={
                        {
                          Active: "text-red-500",
                          Resolved: "text-green-500",
                          Pending: "text-yellow-600",
                        }[incident.status]
                      }
                    >
                      {incident.status === "Active"
                        ? "🔴 Active"
                        : incident.status === "Resolved"
                          ? "✅ Resolved"
                          : "🟡 Pending"}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}

        {focusedPosition && focusedAlert && (
          <Marker
            position={focusedPosition}
            icon={getFocusedIcon(focusedAlert.status)}
          >
            <Popup>
              <div className="text-sm">
                <strong>{focusedAlert.incidentId}</strong>
                <br />
                <span
                  className={
                    {
                      Active: "text-red-500",
                      Resolved: "text-green-500",
                      Pending: "text-yellow-600",
                    }[focusedAlert.status]
                  }
                >
                  {focusedAlert.status === "Active"
                    ? "🔴 Active"
                    : focusedAlert.status === "Resolved"
                      ? "✅ Resolved"
                      : "🟡 Pending"}{" "}
                  {focusedAlert.location}
                </span>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-xs space-y-2 z-1000">
        <p className="font-semibold text-slate-800 mb-1">
          Today&apos;s Incidents
        </p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow"></span>
          <span className="text-slate-700">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-white shadow"></span>
          <span className="text-slate-700">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow"></span>
          <span className="text-slate-700">Resolved</span>
        </div>
      </div>
    </>
  );
}

function FocusedMapController({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, zoom, { duration: 1.1 });
  }, [map, position, zoom]);

  return null;
}
