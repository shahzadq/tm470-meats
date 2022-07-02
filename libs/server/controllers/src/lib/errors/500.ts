import { NextApiRequest, NextApiResponse } from 'next';
import { constructErrorResponse } from './error.functions';

export function error500(req: NextApiRequest, res: NextApiResponse) {
  return constructErrorResponse(res, {
    message: 'Internal server error.',
    status: 500,
  });
}
