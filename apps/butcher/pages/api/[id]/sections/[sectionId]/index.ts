import utils from '@tm470-meats/server/utils';
import { item } from '../../../../../api/controllers/item';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';
import middleware from '@tm470-meats/server/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return await middleware.auth.internal(req, res, async () => {
        return await item.POST(req, res);
      });

    case 'GET':
      return await item.GET.many(req, res);

    case 'DELETE':
      return await middleware.auth.internal(req, res, async () => {
        return await item.DELETE.many(req, res);
      });

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(handler, utils.session.iron.config);
