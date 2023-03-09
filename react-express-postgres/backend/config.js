// Environment variables set in docker-compose file.
const {
  NODE_ENV,
  ENVIRONMENT,
  FRONTEND_PORT,
  FRONTEND_URL,
  BACKEND_URL,
  PORT,
} = process.env;

// Use production urls unless ENVIRONMENT === "local".
let frontendUrl = FRONTEND_URL;
let backendUrl = BACKEND_URL;

if (ENVIRONMENT && ENVIRONMENT === "local") {
  frontendUrl = `http://localhost:${FRONTEND_PORT}`;
  backendUrl = `http://localhost:${PORT}`;
}

// Exported configuration values.
const configuration = {
  PORT: PORT ?? 9009,
  NODE_ENV,
  FRONTEND_URL: frontendUrl,
  BACKEND_URL: backendUrl,
};

module.exports = configuration;
