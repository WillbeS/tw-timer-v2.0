///////////// for del when safe /////////////////////
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
///////////////////////////////////////////////////////////

// New approach, the above one will be deleted after refactoring
export const getObjFromStorage = (key: string) => {
  let data = localStorage.getItem(key);

  if (!data || data === 'undefined') {
    //saveData(key, {});
    return {};
  }

  return JSON.parse(data);
};

export const getArrFromStorage = (key: string) => {
  let data = localStorage.getItem(key);

  if (!data || data === 'undefined') {
    //saveData(key, []);
    return [];
  }

  return JSON.parse(data);
};

export const saveToStorage = (key: string, data: object) => {
  if (!data) return;

  localStorage.setItem(key, JSON.stringify(data));
};
