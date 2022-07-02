import { post } from './post';
import { getOne, getMany } from './get';
import { put } from './put';
import { delOne, delMany } from './delete';

export const business = {
  POST: post,
  GET: { one: getOne, many: getMany },
  PUT: put,
  DELETE: { one: delOne, many: delMany },
};
