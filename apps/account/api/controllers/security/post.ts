import controllers from '@tm470-meats/server/controllers';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';

export async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  try {
    await database.security.create({
      email: req.body.email,
      password: req.body.password,
    });

    return next(req, res);
  } catch (err) {
    return controllers.errors.construct(res, {
      message: 'Email already registered.',
      status: 400,
    });
  }
}
