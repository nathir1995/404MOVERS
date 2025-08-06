import React, { useState } from "react";

export const usePagination = (initialPage = 1, initialPerPage = 10) => {
  const [page, setPage] = useState(initialPage);
  const [per_page, setPerPage] = useState(initialPerPage);

  const handlePageChange = React.useCallback(
    (val) => setPage(val.selected + 1),
    []
  );
  const handlePerPageChange = React.useCallback((val) => {
    setPerPage(val);
    setPage(1);
  }, []);

  return React.useMemo(
    () => ({
      page,
      per_page,
      handlePageChange,
      handlePerPageChange,
      setPage,
    }),
    [page, setPage, per_page, handlePageChange, handlePerPageChange]
  );
};
