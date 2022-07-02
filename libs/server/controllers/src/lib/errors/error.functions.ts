import { NextApiResponse } from 'next';
import { IServerResponseError } from './error.interfaces';

export function constructErrorResponse(
  res: NextApiResponse,
  error: IServerResponseError
) {
  return res.status(error.status).json(error);
}
