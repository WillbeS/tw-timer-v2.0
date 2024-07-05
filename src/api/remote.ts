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

const getResponse = async (method: string, endpoint: string, key?: string) => {
  return await fetch(makeURL(endpoint), {
    method,
    headers: makeHeaders(key),
  });
};

const getResponseWithBody = async (
  method: string,
  endpoint: string,
  body: unknown,
  key?: string,
) => {
  return await fetch(makeURL(endpoint), {
    method,
    headers: makeHeaders(key),
    body: JSON.stringify(body),
  });
};

const makeRequest = async (method: string, endpoint: string, body: unknown, key?: string) => {
  try {
    const response = body
      ? await getResponseWithBody(method, endpoint, body, key)
      : await getResponse(method, endpoint, key);

    if (response.status === 404) {
      console.log('Status code: ' + response.status);
      throw new Error('404 Not found');
    }

    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage + '; status code: ' + response.status);
      throw new Error(errorMessage);
    }

    if (response.status !== 204) {
      return response.json();
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const get = async (endpoint: string, key?: string) => {
  return makeRequest('get', endpoint, null, key);
};

export const post = async (endpoint: string, body: unknown, key?: string) => {
  return makeRequest('post', endpoint, body, key);
};

export const put = async (endpoint: string, body: unknown, key?: string) => {
  return makeRequest('put', endpoint, body, key);
};

export const remove = async (endpoint: string, key?: string) => {
  return makeRequest('delete', endpoint, null, key);
};
