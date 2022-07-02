import { errorController } from './error';

import { error404 } from './404';
import { error405 } from './405';
import { error500 } from './500';

export const errors = {
  controller: errorController,
  codes: { 404: error404, 405: error405, 500: error500 },
};
