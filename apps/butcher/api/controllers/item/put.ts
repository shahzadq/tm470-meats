import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelItem } from '../../models/item.interfaces';
import { itemNameTakenError, itemNotFoundError } from './item.errors';

export async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId, itemName } = req.query;

    const item: IApiModelItem = await database.item.findOne({
      sectionId: sectionId,
      name: itemName,
    });

    if (item) {
      const nameMatch: boolean =
        req.body.name === itemName
          ? false
          : (await database.item.findOne({
              sectionId: sectionId,
              name: req.body.name,
            }))
          ? true
          : false;

      if (!nameMatch) {
        const item: IApiModelItem = await database.item.findOneAndUpdate(
          {
            sectionId: sectionId,
            name: itemName,
          },
          req.body
        );

        return res.status(200).json(item);
      } else {
        return itemNameTakenError(res);
      }
    } else {
      return itemNotFoundError(res);
    }
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
