/**
 * Safe array utilities for language mapping
 */
const safeFind = (array, predicate) => {
  return Array.isArray(array) ? array.find(predicate) : undefined;
};

/**
 *
 */
export const mapTranslatedProperties = (
  arrayOfDetails,
  properties,
  language_id
) => {
  if (!Array.isArray(arrayOfDetails) || !properties || !language_id) return "";
  if (arrayOfDetails.length === 0) return "";

  // Use safe array utilities to prevent TypeError
  const target = safeFind(
    arrayOfDetails,
    (item) => item.language_id === language_id
  );
  if (!target) {
    return "";
  }

  if (!Array.isArray(properties)) {
    return target[properties];
  }

  // [prop1, prop2, prop3, ....] is passed
  const ret = {};
  properties.forEach((prop) => {
    ret[prop] = target[prop];
  });
  return ret;
};
