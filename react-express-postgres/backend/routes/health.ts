import express from 'express';
const router = express.Router();

import { Request, Response } from 'express';
import { healthController } from '../controllers';

/**
 * @method GET
 * @route /health
 */
router.get('/', (req: Request, res: Response) => {
  res.send('Application is healthy!');
});

/**
 * @method GET
 * @route /health/ready
 */
router.get('/ready', healthController.isReady);

export default router;
