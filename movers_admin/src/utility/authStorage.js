import { APP_NAME } from "configs/global";

const PREFIX = APP_NAME;
const TOKEN_KEY = `${PREFIX}_TOKEN`;
const USER_KEY = `${PREFIX}_USER`;

/*
 * The localStorage API is only available in the browser. When this module is
 * imported in a non‑browser environment (for example during server side
 * rendering or in unit tests), referencing `localStorage` will throw a
 * ReferenceError. To guard against this, we wrap all accesses in checks for
 * `typeof window !== 'undefined'` and fall back to no‑ops when storage is
 * unavailable.
 */
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// token helpers
const storeToken = (token) => {
  if (isBrowser) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
};
const getToken = () => {
  return isBrowser ? window.localStorage.getItem(TOKEN_KEY) : null;
};
const removeToken = () => {
  if (isBrowser) {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

// user helpers
const storeUser = (user) => {
  if (isBrowser) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};
const getUser = () => {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};
const removeUser = () => {
  if (isBrowser) {
    window.localStorage.removeItem(USER_KEY);
  }
};
const updateUser = (newValues) => {
  const oldUser = getUser();
  const newUser = oldUser ? { ...oldUser, ...newValues } : newValues;
  storeUser(newUser);
};

// combined helpers
const store = (user, token) => {
  storeUser(user);
  storeToken(token);
};
const remove = () => {
  removeToken();
  removeUser();
};
const get = () => ({
  user: getUser(),
  token: getToken(),
});

export const authStorage = {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  updateUser,
  store,
  remove,
  get,
};
