import { get, post, put, remove } from './remote';

export const api = {
  get,
  post,
  put,
  delete: remove,
};
