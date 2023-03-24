import { Request, Response, NextFunction } from 'express';

/**
 * Wraps a route handler (controller) function with error handling logic.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Function} handler - The route handler function to wrap.
 * @returns {Function} A new middleware function that wraps the route handler in a try-catch block.
 */
const errorWrapper = (handler: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default errorWrapper;
