import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelItem } from '../../models/item.interfaces';
import { itemNameTakenError } from './item.errors';

export async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId } = req.query;

    const item: IApiModelItem = await database.item.findOne({
      sectionId: sectionId,
      name: req.body.name,
    });

    if (!item) {
      const item: IApiModelItem = await database.item.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description && req.body.description,
        sectionId: sectionId,
      });

      return res.status(200).json(item);
    } else {
      return itemNameTakenError(res);
    }
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
