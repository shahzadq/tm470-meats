import controllers, { interfaces } from '@tm470-meats/server/controllers';
import * as ironSession from 'iron-session';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const error: interfaces.errors.IServerResponseError = {
  message: 'Unauthorised.',
  status: 401,
};

export async function withAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  try {
    const { user } = req.session as any;
    const { id } = req.query;

    if (user) {
      if (id === user._id) {
        return next(req, res);
      } else {
        return controllers.errors.construct(res, error);
      }
    } else {
      return controllers.errors.construct(res, error);
    }
  } catch (err) {
    return controllers.errors.construct(res, error);
  }
}

export function internalWithAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  return withAuth(req, res, next);
}

export function handlerWithAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return withAuth(req, res, handler);
  };
}
