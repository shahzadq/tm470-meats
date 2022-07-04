import controllers from '@tm470-meats/server/controllers';
import { NextApiResponse } from 'next';

export const itemNameTakenError = (res: NextApiResponse) => {
  controllers.errors.construct(res, {
    message: 'That item name already exists in this section.',
    status: 400,
  });
};

export const itemNotFoundError = (res: NextApiResponse) => {
  controllers.errors.construct(res, {
    message: 'No item with matching name in section.',
    status: 400,
  });
};
