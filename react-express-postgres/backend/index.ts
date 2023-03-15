import app from './express';
import config from './config';
const { PORT } = config;
import { logMessages } from './utils';
const { SERVER_START, UTC_DATE_TIME, PACIFIC_DATE_TIME, CURRENT_NODE_VERSION } = logMessages;

app.listen(PORT, () => {
  try {
    console.info(SERVER_START);
    console.info(CURRENT_NODE_VERSION);
    console.info(UTC_DATE_TIME);
    console.info(PACIFIC_DATE_TIME);
  } catch (error) {
    console.error(error);
  }
});
