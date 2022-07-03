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

    const business: IApiModelBusiness = await database.business.findOne({
      securityId: id,
      name: name,
    });

    if (business) {
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
            { securityId: id, name: name },
            { name: req.body.name.toLowerCase() },
            { new: true }
          );

        return res.status(200).json(business);
      } else {
        return businessNameTakenError(res);
      }
    } else {
      return businessNotFoundError(res);
    }
  } catch (err) {
    return businessNotFoundError(res);
  }
}
