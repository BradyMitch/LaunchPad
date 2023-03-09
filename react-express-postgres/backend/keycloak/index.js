const bodyParser = require("body-parser");
const oauthRouter = require("./routes");

exports.middleware = require("./middleware");

exports.keycloakInit = (app) => {
  /**
   * Middleware for parsing request bodies.
   * @module body-parser
   * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
   * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
   */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /**
   * Sets the default view engine for the application to EJS (Embedded JavaScript).
   *
   * The `view engine` setting is used by Express to automatically render views
   * with the specified engine. By setting it to EJS, you can use EJS templates
   * to generate HTML output in your application.
   */
  app.set("view engine", "ejs");

  // Routes defined in ./routes.js file.
  app.use("/oauth", oauthRouter);
};
