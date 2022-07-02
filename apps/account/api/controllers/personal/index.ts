import { get } from './get';
import { post } from './post';
import { del } from './delete';
import { put } from './put';

export const personal = { POST: post, GET: get, PUT: put, DELETE: del };
