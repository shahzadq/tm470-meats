import utils from '@tm470-meats/server/utils';
import { item } from '../../../../../../api/controllers/item';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';
import middleware from '@tm470-meats/server/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'GET':
      return await item.GET.one(req, res);

    case 'PUT':
      return await middleware.auth.internal(req, res, async () => {
        return await item.PUT(req, res);
      });

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(handler, utils.session.iron.config);
