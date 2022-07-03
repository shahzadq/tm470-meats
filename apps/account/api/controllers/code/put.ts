import controllers from '@tm470-meats/server/controllers';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSecurity } from '../../models/security.interfaces';
import { IApiModelVerification } from '../../models/verification.interfaces';

export async function put(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: NextApiHandler
) {
  try {
    const { id } = req.query;

    const security: IApiModelSecurity = await database.security.findById(id);

    const verification: IApiModelVerification =
      await database.verification.findOne({ securityId: security._id });

    if (req.body.code === verification.code) {
      // the codes match
      const d = new Date();

      if (d.getTime() < verification.expiration.code.getTime()) {
        // the code is still in effect
        await verification.updateOne({
          used: true,
          expiration: {
            ...verification.expiration,
            effect: Date.now() + 600000,
          },
        });

        await verification.save();

        return next
          ? next(req, res)
          : res.status(200).json({ message: 'Code verified.' });
      } else {
        return controllers.errors.construct(res, {
          message: 'Code has expired.',
          status: 400,
        });
      }
    } else {
      return controllers.errors.construct(res, {
        message: 'Invalid code provided.',
        status: 400,
      });
    }
  } catch (err) {
    return controllers.errors.construct(res, {
      message: 'Invalid id provided.',
      status: 400,
    });
  }
}
