import controllers from '@tm470-meats/server/controllers';
import { NextApiRequest, NextApiResponse } from 'next';

export async function del(req: NextApiRequest, res: NextApiResponse) {
  try {
    await req.session.destroy();
    return res.status(200).json({ message: 'Logout successful.' });
  } catch (err) {
    return controllers.errors.codes[500](req, res);
  }
}
