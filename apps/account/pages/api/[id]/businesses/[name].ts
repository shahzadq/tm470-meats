import utils from '@tm470-meats/server/utils';
import { business } from '../../../../api/controllers/business';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';
import middleware from '@tm470-meats/server/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'GET':
      return await business.GET.one(req, res);

    case 'PUT':
      return await business.PUT(req, res);

    case 'DELETE':
      return await business.DELETE.one(req, res);

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(
  middleware.auth.handler(handler),
  utils.session.iron.config
);
