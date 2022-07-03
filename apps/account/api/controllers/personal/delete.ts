import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { personalNotFoundError } from './personal.errors';

export async function del(
  req: NextApiRequest,
  res: NextApiResponse,
  next?: NextApiHandler
) {
  try {
    const { id } = req.query;
    await database.personal.findOneAndDelete({ securityId: id });
    return next ? next(req, res) : res.status(200).json({ deleted: true });
  } catch (err) {
    return personalNotFoundError(res);
  }
}
