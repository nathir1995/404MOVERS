export const allAreTrue = (object, except = []) => {
  let ret = true;
  Object.entries(object).forEach(([key, value]) => {
    if (!value && !except.includes(key)) {
      ret = false;
    }
  });
  return ret;
};

export const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const removeNull = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) obj[key] = "";
    if (typeof obj[key] === "object") removeNull(obj[key]);
  }
};

export const objectValuesToArray = (object) =>
  Object.keys(object).map((key) => object[key]);
