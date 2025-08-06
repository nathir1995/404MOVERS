export const stringifyParams = (params, exlude = []) => {
  let queryParams = "";
  Object.entries(params).forEach(([key, value]) => {
    if (value && !exlude.includes(key)) {
      queryParams += `${key}=${value}&`;
    }
  });
  return queryParams;
};
