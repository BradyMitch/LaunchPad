const { FRONTEND_URL, BACKEND_URL } = require("../config");
const { keycloak } = require("../utils");
const { getAccessToken, getAuthorizationUrl, getLogoutUrl } = keycloak;

/**
 * Prompts the user to login.
 * @author Zach Bourque
 * @method GET
 * @route /oauth/login
 */
exports.login = async (req, res) => {
  try {
    if (req.token) {
      res.redirect(``);
    } else {
      const baseURL = BACKEND_URL;
      const authUrl = await getAuthorizationUrl(baseURL);
      res.redirect(authUrl);
    }
  } catch (error) {
    console.error("Controller: Error in login", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Redirects user to the frontend, with an access and refresh token.
 * @author Zach Bourque
 * @method GET
 * @route /oauth/login/callback
 */
exports.callback = async (req, res) => {
  try {
    const { code } = req.query;
    const baseURL = BACKEND_URL;
    const tokens = await getAccessToken({ code, baseURL });
    const redirectUrl = new URL(FRONTEND_URL);
    redirectUrl.searchParams.set("token", tokens.access_token);
    res
      .cookie("refresh_token", tokens.refresh_token, { httpOnly: true })
      .redirect(redirectUrl);
  } catch (error) {
    console.error("Controller: Error in login callback", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Logs out the user and, once finished, redirects them to /oauth/logout/callback
 * @author Zach Bourque
 * @method GET
 * @route /oauth/logout
 */
exports.logout = (req, res) => {
  try {
    const baseURL = BACKEND_URL;
    const logoutUrl = getLogoutUrl(baseURL);
    res.redirect(logoutUrl);
  } catch (error) {
    console.error("Controller: Error in logout", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Removes the user's httpOnly refresh token, and redirects back to the frontend.
 * @author Zach Bourque
 * @method GET
 * @route /oauth/logout/callback
 */
exports.logoutCallback = (req, res) => {
  res.cookie("refresh_token", "", { httpOnly: true }).redirect(FRONTEND_URL);
};

