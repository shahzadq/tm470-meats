import utils from '@tm470-meats/server/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import controllers from '@tm470-meats/server/controllers';
import { security } from '../../../api/controllers/security';
import { business } from '../../../api/controllers/business';
import { personal } from '../../../api/controllers/personal';
import { code } from '../../../api/controllers/code';
import { IApiModelSecurity } from '../../../api/models/security.interfaces';
import database from '../../../api/models';
import axios from 'axios';

const accountTypes = { business, personal };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await utils.database.connect();

  switch (method) {
    case 'POST':
      return await security.POST(req, res, async () => {
        return await accountTypes[(req.body.type as string).toLowerCase()].POST(
          req,
          res,
          async () => {
            return await code.POST(req, res, async () => {
              const security: IApiModelSecurity =
                await database.security.findOne({ email: req.body.email });

              await axios.post(`http://localhost:4300/api/${security._id}/sections`);

              return res.status(200).json({
                message:
                  'Account created successfully. Check email for code to verify account.',
                _id: security._id,
              });
            });
          }
        );
      });

    default:
      return controllers.errors.codes[405](req, res);
  }
}

export default handler;
