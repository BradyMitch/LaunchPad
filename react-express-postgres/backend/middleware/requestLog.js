const { colors: c } = require("../utils");

const requestLog = (error, req, res, next) => {
  const { locals, status } = res; // locals - Object passed through the life of the request.
  const { method, originalUrl } = req;

  if (error) next();

  const msg = locals.logMsg ?? "No log message.";

  if (status.toString().startsWith("2")) {
    console.log(
      `${c.Green}REQ LOG: ${c.Lime}(${status}) [${method}] ${originalUrl}, ${c.Reset}${msg}`
    );
  } else {
    console.log(
      `${c.Gold}REQ LOG: ${c.Yellow}(${status}) [${method}] ${originalUrl}, ${c.Reset}${msg}`
    );
  }

  next();
};

module.exports = requestLog;

