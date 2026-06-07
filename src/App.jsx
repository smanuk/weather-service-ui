import { useCallback, useEffect, useState } from "react";
import { fetchAllReadings } from "./api.js";
import LocationCard from "./components/LocationCard.jsx";

const POLL_INTERVAL_MS = 5000;

export default function App() {
  const [readingsByLocation, setReadingsByLocation] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchAllReadings();
      setReadingsByLocation(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load plus light polling so cards stay current.
  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const locations = Object.keys(readingsByLocation).sort();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Weather Service</h1>
        <p className="app__subtitle">Live readings, last 20 per location</p>
      </header>

      {error && <p className="app__error">Could not reach the service: {error}</p>}

      {loading ? (
        <p className="app__empty">Loading…</p>
      ) : locations.length === 0 ? (
        <p className="app__empty">No readings yet.</p>
      ) : (
        <div className="card-grid">
          {locations.map((location) => (
            <LocationCard
              key={location}
              locationName={location}
              readings={readingsByLocation[location]}
            />
          ))}
        </div>
      )}
    </div>
  );
}