import controllers from '@tm470-meats/server/controllers';
import { NextApiResponse } from 'next';
import { constructNotFoundError } from '../controllers.errors';

export const personalNotFoundError = (res: NextApiResponse) => {
  controllers.errors.construct(res, constructNotFoundError('personal'));
};
