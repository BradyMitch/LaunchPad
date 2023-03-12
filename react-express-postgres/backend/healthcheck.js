const http = require('http');
const { colors: c } = require('./utils');
const { BACKEND_URL, PORT, ENVIRONMENT } = require('configuration');

let backendUrl = BACKEND_URL;
if (ENVIRONMENT && ENVIRONMENT === 'local') backendUrl = `http://localhost:${PORT}`;

const healthUrl = `${backendUrl}/health`;

const req = http.request(healthUrl, (res) => {
  process.exitCode = res.statusCode === 200 ? 0 : 1;
});

req.on('error', (error) => {
  console.error(`${c.Pink}Healthcheck failed with error: ${c.Reset}${error}`);
  process.exit(1);
});

req.end();
