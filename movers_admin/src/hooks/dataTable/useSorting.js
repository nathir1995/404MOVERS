import { useState } from "react";

export const useSorting = () => {
  const [order_by, setOrderBy] = useState(null);
  const [order_type, setOrderType] = useState(null);
  const handleSort = (column, sortDirection) => {
    setOrderBy(column.selector);
    setOrderType(sortDirection);
  };

  return {
    order_by,
    order_type,
    handleSort,
  };
};
