import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelPersonal } from '../../models/personal.interfaces';
import { personalNotFoundError } from './personal.errors';

export async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const firstName = req.body.firstName && { firstName: req.body.firstName };
    const lastName = req.body.lastName && { lastName: req.body.lastName };
    const values = { ...firstName, ...lastName };

    const personal: IApiModelPersonal =
      await database.personal.findOneAndUpdate({ securityId: id }, values, {
        new: true,
      });

    if (personal) {
      return res.status(200).json(personal);
    } else {
      return personalNotFoundError(res);
    }
  } catch (err) {
    return personalNotFoundError(res);
  }
}
