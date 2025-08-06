import React from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";
import { GrView } from "react-icons/gr";

const useTableColumns = () => {
  return React.useMemo(
    () => [
      {
        name: `Name`,
        selector: "name",
      },
      {
        name: `Price`,
        selector: "price",
      },
      {
        name: `Description`,
        selector: "description",
      },
      {
        name: "",
        right: true,
        button: true,
        cell: (row) => (
          <NavLink to={Routes.move_package_details.navTo(row.id)}>
            <GrView size={22} />
          </NavLink>
        ),
      },
    ],
    []
  );
};

export default useTableColumns;
