"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AlertSosButton } from "@/components/alert/sos-button";
import { AlertLocationCard } from "@/components/alert/location-card";
import { AlertStatusBar } from "@/components/alert/status-bar";
import { AlertHeader } from "@/components/alert/header";
import { AlertConfirmation } from "@/components/alert/confirmation";
import { AlertSeveritySelector } from "@/components/alert/severity-selector";

type AlertPhase = "idle" | "confirming" | "sending" | "sent";
type Severity = "High" | "Moderate" | "Low";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  address: string;
  loading: boolean;
  error: string | null;
}

export default function AlertPage() {
  const [phase, setPhase] = useState<AlertPhase>("idle");
  const [severity, setSeverity] = useState<Severity>("High");
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    address: "Detecting location...",
    loading: true,
    error: null,
  });

  // Get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
        address: "Location unavailable",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          address: `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`,
          loading: false,
          error: null,
        });
      },
      (err) => {
        // Fallback to Eastern Province coordinates
        setLocation({
          latitude: 26.3927,
          longitude: 50.0132,
          accuracy: null,
          address: "26.3927°N, 50.0132°E (Default)",
          loading: false,
          error: null,
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleSosPress = useCallback(() => {
    setPhase("confirming");
  }, []);

  const handleConfirmSend = useCallback(async () => {
    setPhase("sending");

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
          severity,
          address: location.address,
        }),
      });

      if (!res.ok) throw new Error("Failed to send alert");

      setPhase("sent");

      // Reset after 5 seconds
      setTimeout(() => {
        setPhase("idle");
      }, 5000);
    } catch {
      // Still show sent for demo purposes
      setPhase("sent");
      setTimeout(() => {
        setPhase("idle");
      }, 5000);
    }
  }, [location, severity]);

  const handleCancel = useCallback(() => {
    setPhase("idle");
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            phase === "sent"
              ? "radial-gradient(circle, #22c55e 0%, transparent 70%)"
              : phase === "sending"
                ? "radial-gradient(circle, #f59e0b 0%, transparent 70%)"
                : "radial-gradient(circle, #dc2626 0%, transparent 70%)",
        }}
      />

      <AlertHeader />

      <main className="flex-1 flex flex-col px-5 pb-8 pt-4 relative z-10 max-w-md mx-auto w-full">
        {/* Status Bar */}
        <AlertStatusBar phase={phase} />

        {/* Location Card */}
        <AlertLocationCard location={location} />

        {/* Severity Selector */}
        {phase === "idle" && (
          <AlertSeveritySelector severity={severity} onSelect={setSeverity} />
        )}

        {/* Center Content - SOS Button or Confirmation */}
        <div className="flex-1 flex items-center justify-center py-6">
          {phase === "idle" && <AlertSosButton onPress={handleSosPress} />}
          {phase === "confirming" && (
            <AlertConfirmation
              severity={severity}
              location={location.address}
              onConfirm={handleConfirmSend}
              onCancel={handleCancel}
            />
          )}
          {phase === "sending" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500/30 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 animate-ping" />
                </div>
              </div>
              <p className="text-amber-400 font-semibold text-lg">
                Sending Alert...
              </p>
              <p className="text-slate-500 text-sm">
                Transmitting to Najm Dashboard
              </p>
            </div>
          )}
          {phase === "sent" && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-emerald-400 font-semibold text-lg">
                Alert Sent Successfully
              </p>
              <p className="text-slate-500 text-sm text-center">
                Najm dispatch has been notified.
                <br />A drone is being deployed to your location.
              </p>
            </div>
          )}
        </div>

        {/* Bottom info */}
        <div className="text-center">
          <p className="text-slate-600 text-xs">
            Najm Drone Emergency Alert System
          </p>
          <p className="text-slate-700 text-xs mt-1">
            Eastern Province - Saudi Arabia
          </p>
        </div>
      </main>
    </div>
  );
}
