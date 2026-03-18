/**
 * Incident Service - Handle all incident operations
 * Provides methods for creating and managing incidents with auto-generated IDs
 */

import { supabase } from "./supabase";
import { generateIncidentId } from "./utils";

export interface CreateIncidentInput {
  date: string;
  time: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  severity: "High" | "Moderate" | "Low";
  confidence: number;
  status: "Active" | "Resolved" | "Pending";
  video_url?: string | null;
}

export interface Incident extends CreateIncidentInput {
  id: string;
  incident_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new incident with auto-generated ID
 */
export async function createIncident(
  input: CreateIncidentInput,
): Promise<Incident> {
  try {
    // Generate the next incident ID automatically
    const incident_id = await generateIncidentId();

    // Insert the incident with the generated ID
    const { data, error } = await supabase
      .from("incidents")
      .insert({
        incident_id,
        date: input.date,
        time: input.time,
        location: input.location,
        latitude: input.latitude || null,
        longitude: input.longitude || null,
        severity: input.severity,
        confidence: input.confidence,
        status: input.status,
        video_url: input.video_url || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Incident;
  } catch (err) {
    console.error("Error creating incident:", err);
    throw err;
  }
}

/**
 * Fetch all incidents
 */
export async function fetchIncidents(): Promise<Incident[]> {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as Incident[];
  } catch (err) {
    console.error("Error fetching incidents:", err);
    throw err;
  }
}

/**
 * Fetch incidents for a specific year
 */
export async function fetchIncidentsByYear(year: number): Promise<Incident[]> {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .like("incident_id", `INC-${year}-%`)
      .order("incident_id", { ascending: false });

    if (error) throw error;
    return (data || []) as Incident[];
  } catch (err) {
    console.error("Error fetching incidents by year:", err);
    throw err;
  }
}

/**
 * Update an incident
 */
export async function updateIncident(
  id: string,
  updates: Partial<CreateIncidentInput>,
): Promise<Incident> {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Incident;
  } catch (err) {
    console.error("Error updating incident:", err);
    throw err;
  }
}

/**
 * Get incident by ID or incident_id
 */
export async function getIncident(
  identifier: string,
): Promise<Incident | null> {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .or(`id.eq.${identifier},incident_id.eq.${identifier}`)
      .single();

    if (error) return null;
    return (data || null) as Incident;
  } catch (err) {
    console.error("Error fetching incident:", err);
    return null;
  }
}

/**
 * Get incident count for the current year
 */
export async function getIncidentCountForCurrentYear(): Promise<number> {
  try {
    const currentYear = new Date().getFullYear();
    const { error, count } = await supabase
      .from("incidents")
      .select("*", { count: "exact" })
      .like("incident_id", `INC-${currentYear}-%`);

    if (error) throw error;
    return count || 0;
  } catch (err) {
    console.error("Error fetching incident count:", err);
    return 0;
  }
}
