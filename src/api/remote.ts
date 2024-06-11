import { REMOTE_URL } from '../data/constants'; //may rename it to BASE_URL

const makeHeaders = (key?: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Accept', 'application/json');

  if (key) {
    requestHeaders.set('X-Custom-Auth', key);
  }

  return requestHeaders;
};

const makeURL = (endpoint: string) => {
  return REMOTE_URL + '/' + endpoint;
};

export const get = async (endpoint: string, key?: string) => {
  try {
    return await fetch(makeURL(endpoint), {
      method: 'get',
      headers: makeHeaders(key),
    });
  } catch (error) {
    throw new Error('Network connection problem. Please try again later.');
  }
};

export const post = async (endpoint: string, body: unknown, key?: string) => {
  try {
    return await fetch(makeURL(endpoint), {
      method: 'post',
      headers: makeHeaders(key),
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error('Network connection problem. Please try again later.');
  }
};

export const remove = async (endpoint: string, key?: string) => {
  try {
    return await fetch(makeURL(endpoint), {
      method: 'delete',
      headers: makeHeaders(key),
    });
  } catch (error) {
    throw new Error('Network connection problem. Please try again later.');
  }
};
