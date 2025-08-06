const KEY = "ELITE_AUCTION_ADMIN_DASHBOARD_GOOGLE_ACCESS_TOKEN";
const store = (value) => localStorage.setItem(KEY, value);
const get = () => localStorage.getItem(KEY);
const remove = () => localStorage.removeItem(KEY);
export const tokenStorage = { store, get, remove };
