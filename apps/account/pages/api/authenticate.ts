import utils from '@tm470-meats/server/utils';
import { authenticate } from '../../api/controllers/authenticate';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { withIronSessionApiRoute } from 'iron-session/next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return authenticate.POST(req, res);

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default withIronSessionApiRoute(handler, utils.session.iron.config);
