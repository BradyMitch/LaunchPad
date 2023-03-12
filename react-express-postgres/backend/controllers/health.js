const { errorWrapper } = require('../utils');

/**
 * Check if application has a connection to the database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users
 */
exports.isReady = errorWrapper(async (req, res) => {
  // TODO
  res.locals.logMsg = 'Application has connection to database.';
  res.send('Application is ready!');
});
