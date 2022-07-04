import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import {
  IApiModelSection,
  TApiModelSectionNameOptions,
} from '../../models/section.interfaces';

export async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const names: Array<TApiModelSectionNameOptions> = [
      'chicken',
      'beef',
      'lamb',
      'mutton',
      'turkey',
      'goat',
      'seafood',
      'other',
    ];

    await names.map(async (name: TApiModelSectionNameOptions) => {
      const section: IApiModelSection = await database.section.findOne({
        securityId: id,
        name: name,
      });

      if (!section) {
        await database.section.create({
          name: name,
          securityId: id,
        });
      }
    });

    const sections: IApiModelSection[] = await database.section.find({
      securityId: id,
    });

    return res.status(200).json(sections);
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
