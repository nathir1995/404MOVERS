export const getCategoryFullName = (arr, category) => {
  const { parent_id } = category;
  if (parent_id === null || parent_id === category.id) {
    return category.name;
  }

  const parent = Array.isArray(arr)
    ? arr.find((cat) => cat.id === parent_id)
    : null;
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
