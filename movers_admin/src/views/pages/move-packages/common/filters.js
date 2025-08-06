export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter(({ name }) =>
    name?.toLowerCase().includes(searchText.toLowerCase())
  );
