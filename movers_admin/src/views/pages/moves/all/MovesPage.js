import React from "react";
import useTableColumns from "./useTableColumns";
import DataTable from "components/table/DataTable";
import { usePagination } from "hooks/dataTable/usePagination";

import { useGetAllMoves } from "api/moves";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import PerPageDropdown from "components/PerPageDropdown";
import MoveTypeSelect, { moveTypeOptions } from "../common/MoveTypeSelect";

const MovesPage = () => {
  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePagination();

  //Table Content -- Data + Columns
  const [moveType, setMoveType] = React.useState(moveTypeOptions[0].value);
  const moveTypeLabel = React.useMemo(
    () => moveTypeOptions.find((opt) => opt.value === moveType)?.label,
    [moveType]
  );
  const { data, isLoading } = useGetAllMoves({
    page,
    per_page,
    type: moveType,
  });

  React.useEffect(() => {
    handlePageChange(1);
    //eslint-disable-next-line
  }, [moveType]);

  const moves = React.useMemo(() => data?.moves?.data || [], [data]);
  const totalRows = data?.moves?.total || 0;
  const columns = useTableColumns();

  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-between flex-wrap"
        style={{ gap: "1rem", marginBottom: "5px" }}
      >
        <Breadcrumbs sx={{ ".MuiBreadcrumbs-ol": { marginBottom: 0 } }}>
          <NavLink to={Routes.moves.url}>
            <p className="m-0">Moves</p>
          </NavLink>
          <p className="m-0">{moveTypeLabel}</p>
        </Breadcrumbs>
        <div className="d-flex" style={{ gap: "4px" }}>
          <MoveTypeSelect onChange={setMoveType} />
          <h6 className="total-rows m-0">Total: {totalRows}</h6>
          <PerPageDropdown
            per_page={per_page}
            handlePerPage={handlePerPageChange}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={moves}
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

export default MovesPage;
