const config = require('./configuration.js');
const {
  getTokens,
  getNewAccessToken,
  getAuthorizationUrl,
  getLogoutUrl,
  getUserInfo,
} = require('./utils');

/**
 * Prompts the user to login.
 * @author Zach Bourque & Brady Mitchell
 * @method GET
 * @route /oauth/login
 */
const login = async (req, res) => {
  try {
    if (!req.token) return res.redirect(getAuthorizationUrl());
    return res.redirect('');
  } catch (error) {
    console.error('Keycloak: Error in login controller', error);
    res.json({ success: false, error: error.message ?? error });
  }
};

/**
 * Redirects user to the frontend, with an access and refresh token.
 * @author Zach Bourque & Brady Mitchell
 * @method GET
 * @route /oauth/login/callback
 */
const loginCallback = (options) => {
  const loginCallbackRequest = async (req, res) => {
    try {
      const { code } = req.query;
      const { access_token, refresh_token } = await getTokens(code);
      const redirectUrl = new URL(config.FRONTEND_URL ?? '');
      redirectUrl.searchParams.set('token', access_token);
      res
        .cookie('refresh_token', refresh_token, { httpOnly: true, secure: true })
        .redirect(redirectUrl.toString() ?? '');

      // Run after login callback request.
      if (options?.afterUserLogin) {
        options.afterUserLogin(getUserInfo(access_token));
      }
    } catch (error) {
      console.error('Keycloak: Error in login callback controller', error);
      res.json({ success: false, error: error.message ?? error });
    }
  };
  return loginCallbackRequest;
};

/**
 * Logs out the user and, once finished, redirects them to /oauth/logout/callback
 * @author Zach Bourque & Brady Mitchell
 * @method GET
 * @route /oauth/logout
 */
const logout = (req, res) => {
  try {
    res.redirect(getLogoutUrl());
  } catch (error) {
    console.error('Keycloak: Error in logout controller', error);
    res.json({ success: false, error: error.message ?? error });
  }
};

/**
 * Removes the user's httpOnly refresh token, and redirects back to the frontend.
 * @author Zach Bourque & Brady Mitchell
 * @method GET
 * @route /oauth/logout/callback
 */
const logoutCallback = (req, res) => {
  try {
    res
      .cookie('refresh_token', '', { httpOnly: true, secure: true })
      .redirect(config.FRONTEND_URL ?? '');
  } catch (error) {
    console.error('Keycloak: Error in logout callback controller', error);
  }
};

/**
 * Use refresh token to get a new access token.
 * @author Brady Mitchell
 * @method POST
 * @route /oauth/token
 */
const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) return res.status(401).send('Cookies must include refresh_token.');

    const access_token = await getNewAccessToken(refresh_token);

    res.json({ access_token });
  } catch (error) {
    res.json({ success: false, error: error.message ?? error });
  }
};

module.exports = {
  login,
  loginCallback,
  logout,
  logoutCallback,
  refreshToken,
};
