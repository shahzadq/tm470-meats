import dbConnect from './lib/dbConnect';
import { ironSessionConfig } from './lib/iron-session.config';

const utils = {
  database: { connect: dbConnect },
  session: { iron: { config: ironSessionConfig } },
};

export default utils;
