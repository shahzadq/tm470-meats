import { post } from './post';
import { getOne, getAll } from './get';
import { put } from './put';
import { delOne, delAll } from './delete';

export const item = {
  POST: post,
  GET: { one: getOne, many: getAll },
  PUT: put,
  DELETE: { one: delOne, many: delAll },
};
