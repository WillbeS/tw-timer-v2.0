import { get, post, put, remove, getNew, postNew, putNew, removeNew } from './remote';

export const api = {
  get,
  post,
  put,
  delete: remove,
  getNew,
  postNew,
  putNew,
  removeNew,
};
