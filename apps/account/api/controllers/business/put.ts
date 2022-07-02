import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelBusiness } from '../../models/business.interfaces';
import {
  businessNameTakenError,
  businessNotFoundError,
} from './business.errors';

export async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.query;

    const nameMatch: boolean = (await database.business.findOne({
      securityId: id,
      name: req.body.name.toLowerCase(),
    }))
      ? true
      : false;

    if (!nameMatch) {
      // the name is available
      const business: IApiModelBusiness =
        await database.business.findOneAndUpdate(
          { securityId: id, name: (name as string).toLowerCase() },
          { name: req.body.name.toLowerCase() },
          { new: true }
        );

      if (business) {
        return res.status(200).json(business);
      } else {
        return businessNotFoundError(res);
      }
    } else {
      return businessNameTakenError(res);
    }
  } catch (err) {
    return businessNotFoundError(res);
  }
}
