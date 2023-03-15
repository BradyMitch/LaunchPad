import { Request, Response } from 'express';
import { errorWrapper } from '../utils';
import config from '../config';
const { ENVIRONMENT } = config;

/**
 * Provide configuration variables to the frontend.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /config
 */
export const getConfig = errorWrapper(async (req: Request, res: Response) => {
  const configuration = {
    ENVIRONMENT,
  };
  res.json(configuration);
});
