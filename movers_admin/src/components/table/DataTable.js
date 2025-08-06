import React from "react";
import { TableSpinner } from "components/table/TableSpinner";

import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
      padding: "2px",
    },
  },
  rows: {
    style: {
      borderRadius: "6px",
    },
  },
  headRow: {
    style: {
      borderRadius: "6px",
      marginBottom: ".25rem",
    },
  },
  noData: {
    style: {
      paddingBlock: "3rem",
      fontWeight: "bold",
    },
  },
};

const DataTableComponent = ({ paginationServer = false, ...props }) => {
  return (
    <DataTable
      responsive
      noHeader
      highlightOnHover
      progressComponent={<TableSpinner />}
      customStyles={customStyles}
      paginationServer={paginationServer}
      paginationComponent={
        paginationServer
          ? () => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={props.totalRows / props.per_page}
                containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={props.page - 1}
                onPageChange={props.handlePageChange}
              />
            )
          : null
      }
      {...props}
    />
  );
};

export default DataTableComponent;
