const express = require("express");
const oauthController = require("./controllers");
const router = express.Router();

/**
 * Prompts the user to login.
 * @author Zach Bourque
 * @method GET
 * @route /oauth/login
 */
router.get("/login", oauthController.login);

/**
 *
 * @author Zach Bourque
 * @method GET
 * @route /oauth/login/callback
 */
router.get("/login/callback", oauthController.callback);

/**
 *
 * @author Zach Bourque
 * @method GET
 * @route /oauth/logout
 */
router.get("/logout", oauthController.logout);

/**
 *
 * @author Zach Bourque
 * @method GET
 * @route /oauth/logout/callback
 */
router.get("/logout/callback", oauthController.logoutCallback);

module.exports = router;
