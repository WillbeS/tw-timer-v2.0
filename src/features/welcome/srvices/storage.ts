export const isFirstVisit = () => {
  let hasWelcome = localStorage.getItem('welcome');

  return hasWelcome ? false : true;
  //return true;
};

export const setAsVisited = () => {
  //console.log('Set as visited');
  localStorage.setItem('welcome', JSON.stringify({ visited: true }));
};
