import { NextApiRequest, NextApiResponse } from 'next';
import { error500 } from './500';
import { IServerResponseError } from './error.interfaces';

export function errorController(
  req: NextApiRequest,
  res: NextApiResponse,
  error?: IServerResponseError
) {
  if (error) {
    return res.status(error.status).json(error);
  }
  return error500;
}
