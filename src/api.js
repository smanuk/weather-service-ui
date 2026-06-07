// Thin wrapper over the weather-service REST API. Requests go to /api/readings
// on this origin; Vite proxies them to the Spring service (see vite.config.js).
const BASE = "/api/readings";

/**
 * @returns {Promise<Record<string, Reading[]>>} readings grouped by location,
 *   e.g. { kitchen: [...], garage: [...] }. Each reading is
 *   { locationName, temperature, humidity, recordedAt }.
 */
export async function fetchAllReadings() {
  const res = await fetch(BASE);
  if (!res.ok) {
    throw new Error(`GET ${BASE} failed with ${res.status}`);
  }
  return res.json();
}