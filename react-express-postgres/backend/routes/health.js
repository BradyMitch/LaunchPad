const express = require('express');
const router = express.Router();
const { healthController } = require('../controllers');

/**
 * @method GET
 * @route /health
 */
router.get('/', (req, res) => {
  res.send('Application is healthy!');
});

/**
 * @method GET
 * @route /health/ready
 */
router.get('/ready', healthController.isReady);

module.exports = router;
