import controllers from '@tm470-meats/server/controllers';
import utils from '@tm470-meats/server/utils';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSecurity } from '../../models/security.interfaces';

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

    let code = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < (length || 4); i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    await utils.email.send(
      'accounts',
      security.email,
      'A code was requested.',
      await utils.email.compile(
        `<html><body>Your code is: {{code}}</body></html>`,
        { code: code }
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
