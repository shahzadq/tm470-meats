import controllers from '@tm470-meats/server/controllers';
import { NextApiResponse } from 'next';
import { constructNotFoundError } from '../controllers.errors';

export const businessNotFoundError = (res: NextApiResponse) => {
  controllers.errors.construct(res, constructNotFoundError('business'));
};

export const businessNameTakenError = (res: NextApiResponse) => {
  controllers.errors.construct(res, {
    message: 'That business name is already registered on your account.',
    status: 400,
  });
};
