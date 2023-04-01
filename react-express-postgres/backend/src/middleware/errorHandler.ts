import { Request, Response, NextFunction } from 'express';
import { colors as c } from '../utils';

interface IErrorHandlerProps {
  error: Error;
  req: Request;
  res: Response;
  next: NextFunction;
}

/**
 * Error handler middleware for handling request errors.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Object} props
 * @param {Object} props.error - The error object.
 * @param {Object} props.req - The request object.
 * @param {Object} props.res - The response object.
 * @param {Function} props.next - The next middleware function.
 */
const errorHandler = (props: IErrorHandlerProps) => {
  const { error, req, res, next } = props;
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
