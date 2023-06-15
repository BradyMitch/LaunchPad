import { Request, Response, NextFunction } from 'express';
import HttpError from './HttpError';

/**
 * Wraps a route handler (controller) function with error handling logic.
 * @param {Function} handler - The route handler (controller) function to wrap.
 * @returns {Function} A new middleware function that wraps the route handler in a try-catch block.
 */
const errorWrapper = (handler: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // Execute the request logic.
      await handler(req, res, next);
    } catch (error) {
      // If an error occurs, log it to console and send response.
      const { message, statusCode } = error as HttpError;
      const { method, originalUrl } = req;

      // Log the error to the console.
      console.error(`REQUEST ERROR: [${method}] ${originalUrl}: ${message}`);

      // Send response back to the client.
      const resStatusCode = statusCode ?? 500;
      res.status(resStatusCode).json({
        method,
        originalUrl,
        message,
      });
    }
  };
};

export default errorWrapper;
