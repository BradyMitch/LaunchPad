import getCurrentDateTime from './getCurrentDateTime';
import * as c from './colors';
import config from '../config';
const { PORT, NODE_VERSION } = config;

export const SERVER_START = `${c.LBlue}Express Server started on port ${c.Reset}${PORT}${c.LBlue}${c.Reset}.`;
export const CURRENT_NODE_VERSION = `${c.Yellow}[NODE]${c.Reset} Current version of node.js: ${NODE_VERSION}`;

// Current date time message in UTC.
export const UTC_DATE_TIME = `${c.Yellow}[UTC]${c.Reset} Current date and time: ${
  getCurrentDateTime().formattedDateUTC
}, ${getCurrentDateTime().formattedTimeUTC}`;
// Current date time message in PT/PST.
export const PACIFIC_DATE_TIME = `${c.Yellow}[${getCurrentDateTime().pacificTimeZone}]${
  c.Reset
} Current date and time: ${getCurrentDateTime().formattedDatePacific}, ${
  getCurrentDateTime().formattedTimePacific
}`;
