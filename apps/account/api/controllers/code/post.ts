import controllers from '@tm470-meats/server/controllers';
import utils from '@tm470-meats/server/utils';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSecurity } from '../../models/security.interfaces';
import * as randomstring from 'randomstring';

export async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: NextApiHandler
) {
  try {
    const { id } = req.query;

    const security: IApiModelSecurity = await database.security.findOne({
      $or: [{ _id: id }, { email: req.body.email }],
    });

    const code = randomstring.generate({ length: 4, readable: true });

    await utils.email.send(
      'accounts',
      security.email,
      'A code was requested.',
      await utils.email.compile(
        `<html><body>Welcome to Meats, {{name}}!.<br /> Your code is: {{code}}</body></html>`,
        {
          code: code,
          name: req.body.firstName ? req.body.firstName : req.body.name,
        }
      )
    );

    await database.verification.findOneAndUpdate(
      { securityId: security._id },
      {
        securityId: security._id,
        code: code,
        used: false,
        expiration: { code: Date.now() + 300000, effect: Date.now() + 600000 },
      },
      { upsert: true }
    );

    return next
      ? next(req, res)
      : res.status(200).json({ message: 'Code sent successfully.' });
  } catch (err) {
    return controllers.errors.construct(res, {
      message: 'Invalid email or id provided.',
      status: 400,
    });
  }
}
