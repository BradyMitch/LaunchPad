const { colors: c } = require("../utils");

/**
 * Error handler middleware for handling application errors.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const requestErrorHandler = (error, req, res, next) => {
  const { message, status } = error;
  const { method, originalUrl } = req;

  const responseJson = {
    method,
    originalUrl,
    status,
    message,
    error,
  };

  // Log the error to the console.
  console.error(
    `${c.Red}REQ ERROR: ${c.Pink}(${status}) [${method}] ${originalUrl}, ${c.Reset}${error}`
  );

  // Send response back to the client.
  if (error.status) res.status(error.status).json(responseJson);
  else res.status(500).json(responseJson);

  next();
};

module.exports = requestErrorHandler;

