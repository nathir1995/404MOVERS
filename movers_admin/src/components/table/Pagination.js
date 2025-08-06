import React from "react";

import "assets/scss/plugins/extensions/react-paginate.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalRows, per_page, page, handlePageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<ChevronLeft size={15} />}
      nextLabel={<ChevronRight size={15} />}
      breakLabel="..."
      breakClassName="break-me"
      pageCount={totalRows / per_page}
      containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
      activeClassName="active"
      forcePage={page - 1}
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
