const TOKEN_KEY = "404_MOVERS";

/**
 * Persist a JWT or session token in the browser's localStorage.  Because
 * `localStorage` is only available in the browser environment, we guard
 * against its use during server-side rendering.  When `window` is
 * undefined (i.e. in a Node/SSR context), this function becomes a no-op.
 *
 * @param {string} value The token to store
 */
const store = (value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(TOKEN_KEY, value);
  }
};

/**
 * Remove the stored token from localStorage.  Safe-guards against
 * executing in a non-browser environment.
 */
const remove = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Retrieve the stored token from localStorage.  Returns null when
 * executed outside of the browser or when no token is present.
 *
 * @returns {string|null}
 */
const get = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const tokenStorage = {
  store,
  remove,
  get,
};
