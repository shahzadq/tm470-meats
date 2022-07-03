import utils from '@tm470-meats/server/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { security } from '../../../api/controllers/security';
import { business } from '../../../api/controllers/business';
import { personal } from '../../../api/controllers/personal';
import { code } from '../../../api/controllers/code';

const accountTypes = { business, personal };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return await security.POST(req, res, async () => {
        return await accountTypes[req.body.type].POST(req, res, async () => {
          return await code.POST(req, res, async () => {
            return res.status(200).json({
              message:
                'Account created successfully. Check email for code to verify account.',
            });
          });
        });
      });

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default handler;
