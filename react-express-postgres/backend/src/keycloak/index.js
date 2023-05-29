const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const oauthRouter = require('./routes.js');
const middleware = require('./middleware.js');

const keycloakInit = (app, options) => {
  /**
   * Middleware for parsing request bodies.
   * @module body-parser
   * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
   * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
   */
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  /**
   * Sets the default view engine for the application to EJS (Embedded JavaScript).
   *
   * The `view engine` setting is used by Express to automatically render views
   * with the specified engine. By setting it to EJS, you can use EJS templates
   * to generate HTML output in your application.
   */
  app.set('view engine', 'ejs');

  // Allows for use of req.cookies
  app.use(cookieParser());

  /**
   * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
   * @module cors
   * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
   */
  app.use(
    cors({
      credentials: true,
    }),
  );

  // Routes defined in ./routes.js file.
  app.use('/oauth', oauthRouter(options));
};

module.exports = {
  middleware,
  keycloakInit,
};
