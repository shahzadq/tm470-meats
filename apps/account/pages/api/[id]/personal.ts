import utils from '@tm470-meats/server/utils';
import { personal } from '../../../api/controllers/personal';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';
import middleware from '@tm470-meats/server/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return await personal.POST(req, res);

    case 'GET':
      return await personal.GET(req, res);

    case 'PUT':
      return await personal.PUT(req, res);

    case 'DELETE':
      return await personal.DELETE(req, res);

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(
  middleware.auth.handler(middleware.verification.handler(handler)),
  utils.session.iron.config
);
