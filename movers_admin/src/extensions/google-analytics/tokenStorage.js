const KEY = "ELITE_AUCTION_ADMIN_DASHBOARD_GOOGLE_ACCESS_TOKEN";

/*
 * Google Analytics token storage for the admin dashboard.  Because the
 * `localStorage` API only exists in the browser, directly referencing
 * `localStorage` in environments such as SSR or tests will throw a
 * ReferenceError. Guard accesses behind checks for `window` and provide
 * graceful fallbacks when unavailable.
 */
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const store = (value) => {
  if (isBrowser) {
    window.localStorage.setItem(KEY, value);
  }
};
const get = () => {
  return isBrowser ? window.localStorage.getItem(KEY) : null;
};
const remove = () => {
  if (isBrowser) {
    window.localStorage.removeItem(KEY);
  }
};

export const tokenStorage = { store, get, remove };
