import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique Incident ID in format: INC-YYYY-NNN
 * where YYYY is the year and NNN is a sequential 3-digit counter
 */
export async function generateIncidentId(): Promise<string> {
  const currentYear = new Date().getFullYear();

  try {
    // Get the highest incident number for the current year
    const { data, error } = await supabase
      .from("incidents")
      .select("incident_id")
      .like("incident_id", `INC-${currentYear}-%`)
      .order("incident_id", { ascending: false })
      .limit(1);

    if (error) throw error;

    let nextNumber = 1;

    if (data && data.length > 0) {
      // Extract the number from the last ID (e.g., "INC-2024-008" -> 8)
      const lastId = data[0].incident_id;
      const lastNumber = parseInt(lastId.split("-")[2], 10);
      nextNumber = lastNumber + 1;
    }

    // Format with leading zeros (001, 002, ..., 999)
    const paddedNumber = String(nextNumber).padStart(3, "0");
    return `INC-${currentYear}-${paddedNumber}`;
  } catch (err) {
    console.error("Error generating Incident ID:", err);
    throw err;
  }
}

/**
 * Alternative: Generate ID using a Supabase stored procedure (recommended for better performance)
 * Call this instead if you've created the get_next_incident_id function in your database
 */
export async function generateIncidentIdViaFunction(): Promise<string> {
  try {
    const { data, error } = await supabase.rpc("get_next_incident_id");

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error generating Incident ID via function:", err);
    throw err;
  }
}
