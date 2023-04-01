import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as routers from './src/routes';
import * as middleware from './src/middleware';
import config from './config';
import { keycloakInit } from './src/keycloak';

const { OPENAPI_OPTIONS, CORS_OPTIONS, RATE_LIMIT_OPTIONS, BACKEND_URL } = config;

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

// Disabled because it exposes information about the used framework to potential attackers.
app.disable('x-powered-by');

// Routing
app.use('/health', routers.healthRouter);
app.use('/config', routers.configRouter);

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

// Error handling middleware - Must be placed after routing so it catches all errors.
app.use(middleware.errorHandler);

export default app;
