import controllers from '@tm470-meats/server/controllers';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelPersonal } from '../../models/personal.interfaces';
import { IApiModelSecurity } from '../../models/security.interfaces';

export async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: NextApiHandler
) {
  try {
    const { id } = req.query;

    const security: IApiModelSecurity = await database.security.findOne({
      $or: [{ email: req.body.email }, { _id: id }],
    });

    const personal: IApiModelPersonal = await database.personal.findOne({
      securityId: security._id,
    });

    if (!personal) {
      // the account doesnt already exist therefore create it
      await database.personal.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        securityId: security._id,
      });

      return next ? next(req, res) : res.status(200).json(personal);
    } else {
      return controllers.errors.construct(res, {
        message: 'One personal account per email allowed.',
        status: 400,
      });
    }
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
