const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const routers = require('./routes');
const middleware = require('./middleware');
const { OPENAPI_OPTIONS, CORS_OPTIONS, RATE_LIMIT_OPTIONS, BACKEND_URL } = require('./config');
const { keycloakInit } = require('./keycloak');

// Define Express App
const app = express();
keycloakInit(app);

// Swagger OpenAPI configuration.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(OPENAPI_OPTIONS)));

/**
 * Middleware for parsing request bodies.
 * @module body-parser
 * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
 * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(CORS_OPTIONS));
app.use(rateLimit(RATE_LIMIT_OPTIONS));

// Routing
app.use('/health', routers.healthRouter);

// Display message on index page.
app.use('/', (req, res) =>
  res.send(
    `<html>
      <head>
        <style>
          h3, body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
          body { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        </style>
      </head>
      <body>
        <h3>Application is Live!</h3>
        View the documentation
        <a href="${BACKEND_URL}/docs">HERE</a>
      </body>
    </html>`,
  ),
);

// Error handling middleware.
// Must be placed after routing so it catches all errors.
app.use(middleware.errorHandler);

module.exports = app;
