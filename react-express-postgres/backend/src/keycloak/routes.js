const express = require('express');
const router = express.Router();

const oauthController = require('./controllers.js');
const { login, loginCallback, logout, logoutCallback, refreshToken } = oauthController;

const oauthRouter = (options) => {
  /**
   * Prompts the user to login.
   * @author Zach Bourque & Brady Mitchell
   * @method GET
   * @route /oauth/login
   */
  router.get('/login', login);

  /**
   * Redirects user to the frontend, with an access and refresh token.
   * @author Zach Bourque & Brady Mitchell
   * @method GET
   * @route /oauth/login/callback
   */
  router.get('/login/callback', loginCallback(options));

  /**
   * Logs out the user and, once finished, redirects them to /oauth/logout/callback
   * @author Zach Bourque & Brady Mitchell
   * @method GET
   * @route /oauth/logout
   */
  router.get('/logout', logout);

  /**
   * Removes the user's httpOnly refresh token, and redirects back to the frontend.
   * @author Zach Bourque & Brady Mitchell
   * @method GET
   * @route /oauth/logout/callback
   */
  router.get('/logout/callback', logoutCallback);

  /**
   * Use refresh token to get a new access token.
   * @author Brady Mitchell
   * @method POST
   * @route /oauth/token
   */
  router.post('/token', refreshToken);

  return router;
};

module.exports = oauthRouter;
