import { REMOTE_URL } from '../data/constants'; //may rename it to BASE_URL

// from the book, not using it right now but may be worth implementing later;
// by annotating the variable type we don't need to specify any other types!!!!
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
};

async function fetchANumber(...args: Parameters<typeof fetch>): Promise<number> {
  const response = await checkedFetch(...args);
  const num = Number(await response.text());
  if (isNaN(num)) {
    throw new Error(`Response was not a number.`);
  }
  return num;
}

//////////////////////////////////////////////////////////////////////

const makeHeaders = (key?: string) => {
  const requestHeaders: HeadersInit = new Headers();
  //it has to be append here instead of set!!!
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
      throw new Error('404 Not found');
    }

    if (response.status === 401) {
      throw new Error('Access denied - invalid key!');
    }

    // In order for the real json response message to be shown the status code must not be 500
    if (response.status === 500) {
      throw new Error('Server error, please try again later.');
    }

    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage + '; status code: ' + response.status, response.statusText);

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
