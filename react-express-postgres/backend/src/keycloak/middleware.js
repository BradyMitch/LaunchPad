const { isJWTValid, getUserInfo } = require('./utils.js');

/**
 * Express middleware that checks for a valid JWT in the Authorization header,
 * sets the decoded token and user information in the request object, and passes
 * control to the next middleware function.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const keycloakMiddleware = async (req, res, next) => {
  // Check if Authorization header exists.
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ error: 'No authorization header found' });

  // Extract token from header and check if it is valid.
  const token = header.split(' ')[1];
  const isTokenValid = await isJWTValid(token);
  if (!isTokenValid) return res.status(403).json({ error: 'Invalid token' });

  // Set decoded token and user information in request object.
  req.token = token;
  req.user = getUserInfo(token);

  // Pass control to the next middleware function.
  next();
};

module.exports = keycloakMiddleware;
