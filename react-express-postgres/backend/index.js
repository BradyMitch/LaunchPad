require('dotenv').config();
const app = require('./express.js');
const { colors: c } = require('./utils');
const { PORT } = require('./config');

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.info(`${c.LBlue}Express Server started on port ${c.Reset}${PORT}${c.LBlue}.${c.Reset}`);
});
