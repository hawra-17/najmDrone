"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Sample incident data for Eastern Province (Dammam, AlKhobar, AlDhahran)
const incidents = [
  {
    id: 1,
    lat: 26.3927,
    lng: 50.0132,
    type: "active",
    title: "Active Incident - Highway 95",
  },
  {
    id: 2,
    lat: 26.4207,
    lng: 50.0888,
    type: "reported",
    title: "Reported - AlKhobar Corniche",
  },
  {
    id: 3,
    lat: 26.2867,
    lng: 50.1142,
    type: "reported",
    title: "Reported - Dhahran Mall Area",
  },
  {
    id: 4,
    lat: 26.4344,
    lng: 50.1033,
    type: "reported",
    title: "Reported - Prince Turki Road",
  },
  {
    id: 5,
    lat: 26.3627,
    lng: 50.0432,
    type: "active",
    title: "Active Incident - King Fahd Road",
  },
];

export default function IncidentMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <span className="text-slate-500">Loading map...</span>
      </div>
    );
  }

  return <MapContent />;
}

function MapContent() {
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

  // Custom icons for markers
  const activeIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: #ef4444;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const reportedIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  // Center on Eastern Province (between Dammam, AlKhobar, and Dhahran)
  const center: [number, number] = [26.3927, 50.0632];

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
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}
            icon={incident.type === "active" ? activeIcon : reportedIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{incident.title}</strong>
                <br />
                <span
                  className={
                    incident.type === "active"
                      ? "text-red-500"
                      : "text-blue-500"
                  }
                >
                  {incident.type === "active" ? "🔴 Active" : "🔵 Reported"}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-xs space-y-2 z-[1000]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow"></span>
          <span className="text-slate-700">Active Incident</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow"></span>
          <span className="text-slate-700">Reported Incidents</span>
        </div>
      </div>
    </>
  );
}
