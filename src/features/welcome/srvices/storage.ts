export const isFirstVisit = () => {
  let hasWelcome = localStorage.getItem('welcome');

  return hasWelcome ? false : true;
  //return true;
};

export const setAsVisited = () => {
  localStorage.setItem('welcome', JSON.stringify({ firstVisit: true }));
};
