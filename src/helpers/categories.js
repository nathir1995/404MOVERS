/**
 * Safe array utilities for category operations
 */
const safeFind = (array, predicate) => {
  return Array.isArray(array) ? array.find(predicate) : undefined;
};

export const getCategoryFullName = (arr, category) => {
  const { parent_id } = category;
  if (parent_id === null || parent_id === category.id) {
    return category.name;
  }

  // Use safe array utilities to prevent TypeError
  const parent = safeFind(arr, (cat) => cat.id === parent_id);
  if (!parent) {
    return category.name;
  }

  return getCategoryFullName(arr, parent) + " / " + category.name;
};

export const constructCategories = (categories) => {
  if (!Array.isArray(categories)) return [];
  return categories.map((category) => ({
    ...category,
    full_name: getCategoryFullName(categories, category),
  }));
};
