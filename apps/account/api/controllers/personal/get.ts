import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelPersonal } from '../../models/personal.interfaces';
import { personalNotFoundError } from './personal.errors';

export async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const personal: IApiModelPersonal = await database.personal.findOne({
      securityId: id,
    });

    if (personal) {
      // the account exists
      return res.status(200).json(personal);
    } else {
      return personalNotFoundError(res);
    }
  } catch (err) {
    return personalNotFoundError(res);
  }
}
