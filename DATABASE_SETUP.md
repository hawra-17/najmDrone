# Incident ID Auto-Generation Setup Guide

This guide helps you set up automatic Incident ID generation in Supabase in the format `INC-YYYY-NNN`.

## Database Schema

### Option 1: Using the incidents table directly

If your `incidents` table doesn't exist yet, create it with this SQL:

```sql
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id VARCHAR(20) UNIQUE NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('High', 'Moderate', 'Low')),
  confidence NUMERIC NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Active', 'Resolved', 'Pending')),
  video_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries on incident_id
CREATE INDEX idx_incidents_incident_id ON incidents(incident_id);
CREATE INDEX idx_incidents_created_year ON incidents(EXTRACT(YEAR FROM created_at));
```

### Option 2: Create a stored function for ID generation (Recommended)

This is more efficient and guaranteed unique. Run this SQL in your Supabase SQL editor:

```sql
CREATE OR REPLACE FUNCTION get_next_incident_id()
RETURNS VARCHAR(20) AS $$
DECLARE
  v_year INTEGER;
  v_next_number INTEGER;
  v_incident_id VARCHAR(20);
BEGIN
  v_year := EXTRACT(YEAR FROM NOW());

  -- Get the next number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(incident_id, 9, 3) AS INTEGER)), 0) + 1
  INTO v_next_number
  FROM incidents
  WHERE incident_id LIKE 'INC-' || v_year || '-%';

  -- Generate the incident ID
  v_incident_id := 'INC-' || v_year || '-' || LPAD(v_next_number::TEXT, 3, '0');

  RETURN v_incident_id;
END;
$$ LANGUAGE plpgsql;
```

### Option 3: Automatic trigger (for guaranteed uniqueness)

If you want the database to generate the ID automatically on insert:

```sql
CREATE OR REPLACE FUNCTION auto_generate_incident_id()
RETURNS TRIGGER AS $$
DECLARE
  v_year INTEGER;
  v_next_number INTEGER;
BEGIN
  IF NEW.incident_id IS NULL THEN
    v_year := EXTRACT(YEAR FROM NOW());

    SELECT COALESCE(MAX(CAST(SUBSTRING(incident_id, 9, 3) AS INTEGER)), 0) + 1
    INTO v_next_number
    FROM incidents
    WHERE incident_id LIKE 'INC-' || v_year || '-%';

    NEW.incident_id := 'INC-' || v_year || '-' || LPAD(v_next_number::TEXT, 3, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_incident_id
BEFORE INSERT ON incidents
FOR EACH ROW
EXECUTE FUNCTION auto_generate_incident_id();
```

## Usage in Your Application

### Frontend: When creating a new incident

```typescript
import { generateIncidentId } from "@/lib/utils";

// When creating a new incident
const newIncidentId = await generateIncidentId();

// Insert into Supabase
const { data, error } = await supabase.from("incidents").insert({
  incident_id: newIncidentId,
  date: new Date().toISOString().split("T")[0],
  time: new Date().toTimeString().slice(0, 8),
  location: "Highway 95",
  severity: "High",
  confidence: 0.95,
  status: "Active",
});
```

### Or use the function approach (if you created the stored procedure):

```typescript
import { generateIncidentIdViaFunction } from "@/lib/utils";

const newIncidentId = await generateIncidentIdViaFunction();
// Rest of the code same as above
```

## Characteristics

✅ **Format**: INC-YYYY-NNN (e.g., INC-2024-001, INC-2024-008)
✅ **Auto-increments**: Sequential numbering per year
✅ **Unique**: No duplicates possible (with proper DB constraints)
✅ **Year-based**: Resets counter each year (INC-2025-001, etc.)
✅ **Backwards compatible**: Works with existing data

## Querying Examples

```sql
-- Get all incidents from 2024
SELECT * FROM incidents WHERE incident_id LIKE 'INC-2024-%';

-- Get the latest incident ID
SELECT incident_id FROM incidents ORDER BY created_at DESC LIMIT 1;

-- Get incident count for current year
SELECT COUNT(*) FROM incidents
WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
```
