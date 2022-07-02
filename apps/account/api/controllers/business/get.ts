import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelBusiness } from '../../models/business.interfaces';
import { businessNotFoundError } from './business.errors';

export async function getMany(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const businesses: IApiModelBusiness[] = await database.business.find({
      securityId: id,
    });

    if (businesses) {
      return res.status(200).json(businesses);
    } else {
      return businessNotFoundError(res);
    }
  } catch (err) {
    return businessNotFoundError(res);
  }
}

export async function getOne(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.query;

    const business: IApiModelBusiness = await database.business.findOne({
      securityId: id,
      name: (name as string).toLowerCase(),
    });

    if (business) {
      return res.status(200).json(business);
    } else {
      return businessNotFoundError(res);
    }
  } catch (err) {
    return businessNotFoundError(res);
  }
}
