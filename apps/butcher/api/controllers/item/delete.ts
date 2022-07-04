import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelItem } from '../../models/item.interfaces';

export async function delAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId } = req.query;

    const items: IApiModelItem[] = await database.item.find({
      sectionId: sectionId,
    });

    await items.map(async (item: IApiModelItem) => {
      await item.delete();
      await item.save();
    });

    return res.status(200).json({ deleted: true });
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}

export async function delOne(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { sectionId, itemName } = req.query;

    await database.item.findOneAndDelete({
      sectionId: sectionId,
      name: itemName,
    });

    return res.status(200).json({ deleted: true });
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
