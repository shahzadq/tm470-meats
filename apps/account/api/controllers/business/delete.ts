import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelBusiness } from '../../models/business.interfaces';
import { businessNotFoundError } from './business.errors';

export async function delMany(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: () => Promise<void>
) {
  try {
    const { id } = req.query;

    const businesses: IApiModelBusiness[] = await database.business.find({
      securityId: id,
    });
    await businesses.map(async (business: IApiModelBusiness) => {
      await business.delete();
      await business.save();
    });

    return next ? next() : res.status(200).json({ deleted: true });
  } catch (err) {
    return businessNotFoundError(res);
  }
}

export async function delOne(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.query;

    await database.business.findOneAndDelete({
      securityId: id,
      name: (name as string).toLowerCase(),
    });

    return res.status(200).json({ deleted: true });
  } catch (err) {
    return businessNotFoundError(res);
  }
}
