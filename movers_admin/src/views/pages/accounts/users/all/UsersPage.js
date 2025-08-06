import React from "react";
import useTableColumns from "../../shared/useTableColumns";
import DataTable from "components/table/DataTable";
import { usePagination } from "hooks/dataTable/usePagination";

import { useGetAllUsers } from "api/accounts/users";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { SearchInput } from "components/input";
import PerPageDropdown from "components/PerPageDropdown";
import { ACCOUNT_TYPE } from "enums/Account_Types";

const UsersPage = () => {
  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePagination();

  //Table Content -- Data + Columns
  const [searchValue, setSearchValue] = React.useState("");
  const { data, isLoading } = useGetAllUsers({
    page,
    per_page,
    search: searchValue,
  });
  const users = React.useMemo(() => data?.users_data?.data || [], [data]);
  const totalRows = data?.users_data?.total || 0;
  const columns = useTableColumns(ACCOUNT_TYPE.USER);

  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-between flex-wrap"
        style={{ gap: "1rem", marginBottom: "2px" }}
      >
        <Breadcrumbs sx={{ ".MuiBreadcrumbs-ol": { marginBottom: 0 } }}>
          <p className="m-0">Accounts</p>
          <NavLink to={Routes.users.url}>
            <p className="m-0">Users</p>
          </NavLink>
        </Breadcrumbs>
        <div className="d-flex" style={{ gap: "4px" }}>
          <SearchInput
            placeholder={"Search for a user"}
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
        data={users}
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

export default UsersPage;
