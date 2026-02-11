import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// In-memory store for alerts (used as fallback / for real-time polling)
const alertStore: {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  severity: string;
  address: string;
  timestamp: string;
  status: string;
}[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, accuracy, severity, address } = body;

    const alert = {
      id: `ALR-${Date.now().toString(36).toUpperCase()}`,
      latitude: latitude || 26.3927,
      longitude: longitude || 50.0132,
      accuracy: accuracy || null,
      severity: severity || "High",
      address: address || "Unknown",
      timestamp: new Date().toISOString(),
      status: "Active",
    };

    // Store in memory for polling
    alertStore.unshift(alert);

    // Keep only last 50 alerts in memory
    if (alertStore.length > 50) {
      alertStore.pop();
    }

    // Try to insert into Supabase alerts table (may not exist yet)
    try {
      await supabase.from("phone_alerts").insert({
        alert_id: alert.id,
        latitude: alert.latitude,
        longitude: alert.longitude,
        accuracy: alert.accuracy,
        severity: alert.severity,
        address: alert.address,
        status: alert.status,
      });
    } catch {
      // Table may not exist, that's okay - alerts are stored in memory
    }

    return NextResponse.json({ success: true, alert }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process alert" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ alerts: alertStore });
}
