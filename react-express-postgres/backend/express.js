const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const routers = require("./routes");
const { requestErrorHandler, requestLog } = require("./middleware");
const { FRONTEND_URL } = require("./config");
const { keycloakInit } = require("./keycloak");

// Define Express App
const app = express();
keycloakInit(app);

/**
 * Middleware for parsing request bodies.
 * @module body-parser
 * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
 * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
 * @module cors
 * @property {string|string[]} origin - The allowed origins for CORS requests.
 * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
 */
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

/**
 * Middleware for rate-limiting requests on the server.
 * @module express-rate-limit
 * @property {number} windowMs - The length of the rate-limiting window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per window per IP address.
 * @property {boolean} headers - Whether to include rate limit info in the `RateLimit-*` headers.
 * @property {boolean} legacy - Whether to include rate limit info in the `X-RateLimit-*` headers (deprecated).
 */
app.use(
  rateLimit({
    windowMs: 2 * 1000, // 2 seconds
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Routing
app.get("/", (req, res) => res.send("Express Server is live!")); // TODO: Replace with swagger docs.
app.use("/health", routers.healthRouter);

// Included last to ensure any errors thrown by middleware and routes will be caught and handled.
app.use(requestErrorHandler);
app.use(requestLog);

module.exports = app;
