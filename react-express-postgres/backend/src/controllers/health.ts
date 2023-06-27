import { Request, Response } from 'express';
import { errorWrapper } from '../utils';
import dataSource from '../../dataSource';
import config from '../../config';
const { DEBUG } = config;

/**
 * Check if application is healthy.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /health
 */
export const isHealthy = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG) console.log('isHealthy controller in controllers/health called.');
  res.send('Application is healthy!');
});

/**
 * Check if application has a connection to the database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /health/ready
 */
export const isReady = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG) console.log('isReady controller in controllers/health called.');
  // Indicates if DataSource was initialized and initial connection was established or not.
  const isInitialized = dataSource.isInitialized;
  if (!isInitialized) {
    res.status(503).send('Database connection is unavailable.');
    return;
  }
  res.send('Application is ready!');
});
