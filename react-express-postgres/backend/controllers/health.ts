import { Request, Response } from 'express';
import { errorWrapper } from '../utils';

/**
 * Check if application is healthy.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /health
 */
export const isHealthy = errorWrapper(async (req: Request, res: Response) => {
  res.send('Application is healthy!');
});

/**
 * Check if application has a connection to the database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /health/ready
 */
export const isReady = errorWrapper(async (req: Request, res: Response) => {
  // TODO
  res.send('Application is ready!');
});
