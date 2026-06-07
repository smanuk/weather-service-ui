import { useState } from "react";
import { submitReading } from "../api.js";

const EMPTY = { locationName: "", temperature: "", humidity: "" };

/**
 * Form for posting a new reading. Calls onSubmitted() after a successful POST
 * so the parent can refresh the dashboard immediately.
 */
export default function ReadingForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitReading({
        locationName: form.locationName.trim(),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
      });
      setForm(EMPTY);
      onSubmitted?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="reading-form" onSubmit={handleSubmit}>
      <input
        className="reading-form__input"
        placeholder="Location"
        value={form.locationName}
        onChange={update("locationName")}
        required
      />
      <input
        className="reading-form__input"
        type="number"
        step="0.1"
        placeholder="Temp °C"
        value={form.temperature}
        onChange={update("temperature")}
        required
      />
      <input
        className="reading-form__input"
        type="number"
        step="1"
        placeholder="Humidity %"
        value={form.humidity}
        onChange={update("humidity")}
        required
      />
      <button className="reading-form__button" type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Add reading"}
      </button>
      {error && <span className="reading-form__error">{error}</span>}
    </form>
  );
}