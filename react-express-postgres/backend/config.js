// Environment variables set in docker-compose file.
const {
  NODE_ENV,
  ENVIRONMENT,
  FRONTEND_PORT,
  FRONTEND_URL,
  BACKEND_URL,
  PORT,
  SSO_AUTH_SERVER_URL,
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
} = process.env;

// Use production url if ENVIRONMENT != 'local' and NODE_ENV = 'production'.
// This is so 'production' mode can be tested locally.
const frontendUrl =
  NODE_ENV === "production" && ENVIRONMENT !== "local"
    ? FRONTEND_URL
    : `http://localhost:${FRONTEND_PORT}`;

const backendUrl =
  NODE_ENV === "production" && ENVIRONMENT !== "local"
    ? BACKEND_URL
    : `http://localhost:${PORT}`;

// Exported configuration values.
const configuration = {
  PORT: PORT ?? 9009,
  NODE_ENV,
  SSO_CLIENT_ID: SSO_CLIENT_ID ?? "",
  SSO_CLIENT_SECRET: SSO_CLIENT_SECRET ?? "",
  OIDC_AUTHORIZATION_URL: `${SSO_AUTH_SERVER_URL}/auth`,
  OIDC_TOKEN_URL: `${SSO_AUTH_SERVER_URL}/token`,
  OIDC_INTROSPECT_URL: `${SSO_AUTH_SERVER_URL}/token/introspect`,
  OIDC_USER_INFO_URL: `${SSO_AUTH_SERVER_URL}/userinfo`,
  OIDC_LOGOUT_URL: `${SSO_AUTH_SERVER_URL}/logout`,
  OIDC_GRANT_TYPE: "authorization_code",
  OIDC_REDIRECT_URL: "/oauth/login/callback",
  OIDC_RESPONSE_TYPE: "code",
  OIDC_SCOPE: "email+openid",
  OIDC_LOGOUT_REDIRECT_URL: "/oauth/logout/callback",
  FRONTEND_URL: frontendUrl,
  BACKEND_URL: backendUrl,
};

module.exports = configuration;

