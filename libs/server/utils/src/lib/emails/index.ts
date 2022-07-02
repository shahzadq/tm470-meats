import { compileHtmlTemplate } from './compile';
import { sendMail } from './send';

export const email = {
  compile: compileHtmlTemplate,
  send: sendMail,
};
