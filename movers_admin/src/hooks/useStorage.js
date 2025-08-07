import { useCallback, useState, useEffect } from "react";

/*
 * Hooks for persisting state in Web Storage.  The Web Storage APIs
 * (`localStorage` and `sessionStorage`) are only available in a browser
 * environment. When these hooks are used during server side rendering (SSR)
 * or in tests without a DOM, direct access to `window.localStorage` or
 * `window.sessionStorage` will throw. To make these hooks resilient, we
 * detect whether `window` and the relevant storage object exist and fall
 * back to a simple in‑memory shim that implements the `getItem`, `setItem`
 * and `removeItem` interface.
 */
export function useLocalStorage(key, defaultValue) {
  const storage = typeof window !== 'undefined' && window.localStorage ? window.localStorage : createMemoryStorage();
  return useStorage(key, defaultValue, storage);
}

export function useSessionStorage(key, defaultValue) {
  const storage = typeof window !== 'undefined' && window.sessionStorage ? window.sessionStorage : createMemoryStorage();
  return useStorage(key, defaultValue, storage);
}

function createMemoryStorage() {
  // simple in‑memory fallback storage. data is lost between renders but
  // prevents errors when storage is unavailable.
  let store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
