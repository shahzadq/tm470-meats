import { NextApiRequest, NextApiResponse } from 'next';
import { constructErrorResponse } from './error.functions';

export function error404(req: NextApiRequest, res: NextApiResponse) {
  return constructErrorResponse(res, {
    message: 'Page not found.',
    status: 404,
  });
}
