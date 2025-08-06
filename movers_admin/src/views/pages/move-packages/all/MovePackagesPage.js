import React from "react";
import useTableColumns from "./useTableColumns";
import DataTable from "components/table/DataTable";

import { useGetMovePackages } from "api/move_packages";
import { AddButton } from "components/AddButton";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

import Breadcrumbs from "@mui/material/Breadcrumbs";

const MovePackagesPage = () => {
  //Table Content -- Data + Columns
  const { data, isLoading } = useGetMovePackages();
  const movePackages = React.useMemo(() => data?.move_packages ?? [], [data]);
  const columns = useTableColumns();

  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-between flex-wrap"
        style={{ gap: "1rem" }}
      >
        <Breadcrumbs>
          <p className="m-0">Moves</p>
          <NavLink to={Routes.move_packages.url}>
            <p className="m-0">Packages</p>
          </NavLink>
        </Breadcrumbs>
        <NavLink to={Routes.add_move_package.url} className="mb-1">
          <AddButton />
        </NavLink>
      </div>
      <DataTable
        columns={columns}
        data={movePackages}
        progressPending={isLoading}
      />
    </>
  );
};

export default MovePackagesPage;
