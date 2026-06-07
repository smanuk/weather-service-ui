import ReadingChart from "./ReadingChart.jsx";

/**
 * One card per location: the latest reading headline plus a chart of the
 * recent history. Readings arrive oldest → newest, so the last item is latest.
 */
export default function LocationCard({ locationName, readings }) {
  const latest = readings[readings.length - 1];

  return (
    <section className="card">
      <header className="card__header">
        <h2 className="card__title">{locationName}</h2>
        <span className="card__count">{readings.length} reading(s)</span>
      </header>

      {latest && (
        <div className="card__metrics">
          <div className="metric">
            <span className="metric__value">{latest.temperature.toFixed(1)}°C</span>
            <span className="metric__label">temperature</span>
          </div>
          <div className="metric">
            <span className="metric__value">{latest.humidity.toFixed(0)}%</span>
            <span className="metric__label">humidity</span>
          </div>
        </div>
      )}

      <ReadingChart readings={readings} />
    </section>
  );
}