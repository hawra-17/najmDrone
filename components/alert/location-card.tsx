"use client";

import { MapPin, Crosshair, Loader2 } from "lucide-react";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  address: string;
  loading: boolean;
  error: string | null;
}

interface AlertLocationCardProps {
  location: LocationData;
}

export function AlertLocationCard({ location }: AlertLocationCardProps) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-red-400" />
        <h3 className="text-slate-300 text-sm font-medium">Your Location</h3>
      </div>

      {location.loading ? (
        <div className="flex items-center gap-3 py-2">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="text-slate-400 text-sm">Detecting GPS location...</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Crosshair className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-200 text-sm font-mono">{location.address}</p>
              {location.accuracy && (
                <p className="text-slate-500 text-xs mt-1">
                  Accuracy: {Math.round(location.accuracy)}m
                </p>
              )}
            </div>
          </div>

          {location.latitude && location.longitude && (
            <div className="flex gap-4 mt-2 pt-2 border-t border-slate-800">
              <div>
                <p className="text-slate-600 text-xs">Latitude</p>
                <p className="text-slate-300 text-xs font-mono">
                  {location.latitude.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-slate-600 text-xs">Longitude</p>
                <p className="text-slate-300 text-xs font-mono">
                  {location.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
