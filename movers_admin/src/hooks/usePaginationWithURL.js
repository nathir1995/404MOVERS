import { useState, useCallback } from "react";
import queryString from "query-string";
import { history } from "../history";
import { stringifyParams } from "helpers";

export const usePaginationWithURL = (location) => {
  const params = queryString.parse(location.search);
  const [page, setPage] = useState(parseInt(params.page) || 1);
  const [per_page, setPerPage] = useState(parseInt(params.per_page) || 10);

  const handlePageChange = useCallback(
    (val) => {
      const queryParams = stringifyParams(params, ["page"]);
      const newPage = val.selected + 1;
      history.push(`${location.pathname}?${queryParams}page=${newPage}`);
      setPage(newPage);
    },
    [setPage, params, location]
  );

  const handlePerPageChange = useCallback(
    (val) => {
      const queryParams = stringifyParams(params, ["per_page"]);
      history.push(`${location.pathname}?${queryParams}per_page=${val}`);
      setPerPage(val);
    },
    [setPerPage, params, location]
  );

  return {
    page,
    per_page,
    handlePageChange,
    handlePerPageChange,
  };
};
