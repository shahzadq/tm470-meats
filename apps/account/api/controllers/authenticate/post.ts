import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSecurity } from '../../models/security.interfaces';
import { compare } from 'bcrypt';

const error = (res: NextApiResponse) => {
  return controllers.errors.construct(res, {
    message: 'Invalid Email or Password.',
    status: 400,
  });
};

export async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const security: IApiModelSecurity = await database.security.findOne({
      email: req.body.email,
    });
    const match: boolean = await compare(req.body.password, security.password);

    if (match) {
      // the passwords match

      if (security.verified) {
        // the account is verified
        return res.status(200).json({ _id: security._id, authenticated: true });
      } else {
        return controllers.errors.construct(res, {
          message: 'Account not verified.',
          status: 401,
        });
      }
    } else {
      return error(res);
    }
  } catch (err) {
    return error(res);
  }
}
