/**
 * Wraps a route handler (controller) function with error handling logic.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {function} handler - The route handler function to wrap.
 * @returns {function} A new middleware function that wraps the route handler in a try-catch block.
 */
const errorWrapper = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = errorWrapper;
