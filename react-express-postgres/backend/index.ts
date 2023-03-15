import dotenv from 'dotenv';
dotenv.config();

import app from './express';
import { colors as c } from './utils';
import config from './config';

app.listen(config.PORT, () => {
  try {
    console.info(
      `${c.LBlue}Express Server started on port ${c.Reset}${config.PORT}${c.LBlue}.${c.Reset}`,
    );
  } catch (error) {
    console.error(error);
  }
});
