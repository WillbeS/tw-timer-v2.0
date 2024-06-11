import { get, post, remove } from './remote';

export const api = {
  get,
  post,
  delete: remove,
};
