export const getData = (key: string) => {
  let data = localStorage.getItem(key);

  if (!data) {
    saveData(key, {});
    return {};
  }

  return JSON.parse(data);
};

export const saveData = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Here should the the logic for storing on the server
