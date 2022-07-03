import utils from '@tm470-meats/server/utils';
import { code } from '../../../api/controllers/code';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';
import middleware from '@tm470-meats/server/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return await code.POST(req, res);

    case 'PUT':
      return await code.PUT(req, res);

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(
  middleware.auth.handler(handler),
  utils.session.iron.config
);
