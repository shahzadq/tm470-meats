import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../models';
import { IApiModelSection } from '../../models/section.interfaces';

export async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const sections: IApiModelSection[] = await database.section.find({
      securityId: id,
    });

    return res.status(200).json(sections);
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
