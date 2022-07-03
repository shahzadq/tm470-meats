import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSecurity } from '../../models/security.interfaces';

export async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const security: IApiModelSecurity =
      await database.security.findByIdAndUpdate(
        id,
        { verified: true },
        { new: true }
      );

    return res.status(200).json({ _id: security._id });
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
