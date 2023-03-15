import { Request, Response, NextFunction } from 'express';
import { colors as c } from '../utils';

/**
 * Error handler middleware for handling application errors.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const { message } = error;
  const { method, originalUrl } = req;

  // Log the error to the console.
  console.error(
    `${c.Pink}REQ ERROR: ${c.Reset}${c.Red}[${method}] ${originalUrl}: ${c.Reset}${message}.`,
  );

  // Send response back to the client.
  res.status(500).json({
    method,
    originalUrl,
    message,
  });

  next();
};

export default errorHandler;
