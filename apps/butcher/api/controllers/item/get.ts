import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelItem } from '../../models/item.interfaces';
import { itemNotFoundError } from './item.errors';

export async function getAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId } = req.query;

    const items: IApiModelItem[] = await database.item.find({
      sectionId: sectionId,
    });

    return res.status(200).json(items);
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}

export async function getOne(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId, itemName } = req.query;

    const item: IApiModelItem = await database.item.findOne({
      sectionId: sectionId,
      name: itemName,
    });

    if (item) {
      return res.status(200).json(item);
    } else {
      return itemNotFoundError(res);
    }
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
