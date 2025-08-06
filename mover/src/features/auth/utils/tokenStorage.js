const TOKEN_KEY = "404_MOVERS";

const store = (value) => {
  localStorage.setItem(TOKEN_KEY, value);
};

const remove = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const get = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const tokenStorage = {
  store,
  remove,
  get,
};
