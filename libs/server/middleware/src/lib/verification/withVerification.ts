import controllers, { interfaces } from '@tm470-meats/server/controllers';
import * as ironSession from 'iron-session';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const error: interfaces.errors.IServerResponseError = {
  message: 'Unauthorised.',
  description: 'Not verified.',
  status: 401,
};

async function withVerification(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  try {
    const { verified } = req.session as any;

    if (verified) {
      return next(req, res);
    } else {
      return controllers.errors.construct(res, error);
    }
  } catch (err) {
    return controllers.errors.construct(res, error);
  }
}

export function internalWithVerification(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  return withVerification(req, res, next);
}

export function handlerWithVerification(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return withVerification(req, res, handler);
  };
}
