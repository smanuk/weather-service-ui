# weather-service-ui

A small React dashboard for the [weather-service](../weather-service) REST API.
Shows one card per location with the latest temperature/humidity and a chart of
the most recent 20 readings, plus a form to submit new readings. The dashboard
polls every 5 seconds.

## Prerequisites

- Node.js 18+ and npm (this project was scaffolded against Node 20+)
- The `weather-service` Spring app running on `http://localhost:8080`

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

The Vite dev server proxies all `/api` requests to the Spring service on
`:8080` (see `vite.config.js`), so the browser only ever talks to one origin —
no CORS configuration is needed. If your API runs on a different host or port,
update the `proxy.target` in `vite.config.js`.

## Build

```bash
npm run build     # outputs static assets to dist/
npm run preview   # serve the production build locally
```

The contents of `dist/` are plain static files and can be served by any static
host, or copied into the Spring app's `src/main/resources/static` if you later
want a single deployable.

## API consumed

| Method | Path                      | Purpose                              |
| ------ | ------------------------- | ------------------------------------ |
| GET    | `/api/readings`           | all readings, grouped by location    |
| GET    | `/api/readings/{location}`| readings for one location            |
| POST   | `/api/readings`           | record a reading                     |