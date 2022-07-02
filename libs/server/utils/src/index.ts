import dbConnect from './lib/dbConnect';
import { ironSessionConfig } from './lib/iron-session.config';
import { email } from './lib/emails';

const utils = {
  database: { connect: dbConnect },
  session: { iron: { config: ironSessionConfig } },
  email: email,
};

export default utils;
