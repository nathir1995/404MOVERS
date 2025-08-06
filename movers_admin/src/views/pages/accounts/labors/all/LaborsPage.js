import React from "react";
import useTableColumns from "../../shared/useTableColumns";
import DataTable from "components/table/DataTable";
import { usePagination } from "hooks/dataTable/usePagination";

import { useGetAllLabors } from "api/accounts/labors";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { SearchInput } from "components/input";
import PerPageDropdown from "components/PerPageDropdown";
import MoverStatusSelect from "../../shared/MoverStatusSelect";

const LaborsPage = () => {
  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePagination();

  //Table Content -- Data + Columns
  const [status, setStatus] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const { data, isLoading } = useGetAllLabors({
    page,
    per_page,
    search: searchValue,
    status,
  });
  const labors = React.useMemo(() => data?.users_data?.data || [], [data]);
  const totalRows = data?.users_data?.total || 0;
  const columns = useTableColumns();

  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-between flex-wrap"
        style={{ gap: "1rem", marginBottom: "5px" }}
      >
        <Breadcrumbs sx={{ ".MuiBreadcrumbs-ol": { marginBottom: 0 } }}>
          <p className="m-0">Accounts</p>
          <NavLink to={Routes.labors.url}>
            <p className="m-0">Labors</p>
          </NavLink>
        </Breadcrumbs>
        <div className="d-flex" style={{ gap: "4px" }}>
          <MoverStatusSelect onChange={setStatus} />
          <SearchInput
            placeholder={"Search for a labor"}
            onChange={(val) => setSearchValue(val)}
          />
          <h6 className="total-rows m-0">Total: {totalRows}</h6>
          <PerPageDropdown
            per_page={per_page}
            handlePerPage={handlePerPageChange}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={labors}
        progressPending={isLoading}
        pagination
        paginationServer
        totalRows={totalRows}
        per_page={per_page}
        page={page}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default LaborsPage;
