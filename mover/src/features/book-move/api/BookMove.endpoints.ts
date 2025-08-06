const BOOK_MOVE_ENDPOINTS = {
  GET_CATEGORIES_WITH_ITEMS: `/api/item-categories`,
  GET_MOVE_PACKAGES: `/api/move-packages`,
  CREATE_MOVE: `/api/user/moves/create`,
} as const;

export default BOOK_MOVE_ENDPOINTS;
