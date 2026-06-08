# --- build stage: compile the Vite app to static assets -----------------------
FROM node:26-alpine AS build
WORKDIR /app

# Install deps against the lockfile first so this layer caches across source edits.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- serve stage: nginx serves dist/ and reverse-proxies /api to the backend ---
FROM nginx:alpine

# The official nginx image envsubst's *.template files into /etc/nginx/conf.d at
# startup, so BACKEND_URL can be set per-deployment via `docker run -e`.
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
