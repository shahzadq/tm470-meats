import { NextApiRequest, NextApiResponse } from 'next';
import { constructErrorResponse } from './error.functions';

export function error405(req: NextApiRequest, res: NextApiResponse) {
  return constructErrorResponse(res, {
    message: 'Invalid request method.',
    status: 405,
  });
}
