import React from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";
import { GrView } from "react-icons/gr";
import { Badge } from "reactstrap";
import { COLORS, LABELS } from "enums/Move_Status";
import { formatDateTime } from "../utils/moveDate.util";

const useTableColumns = () => {
  return React.useMemo(
    () => [
      {
        name: "Status",
        cell: (row) => {
          const status = row.move_status?.key;
          return (
            <Badge style={{ backgroundColor: COLORS[status] }}>
              {LABELS[status] ?? status}
            </Badge>
          );
        },
        width: "100px",
      },
      {
        name: "Package",
        cell: (row) => row?.move_package?.name,
        width: "150px",
      },
      {
        name: "Date & Time",
        cell: (row) => formatDateTime(row.move_date_time),
        width: "150px",
      },
      {
        name: "Start",
        selector: "start_point_name",
        width: "150px",
      },
      {
        name: "End",
        selector: "end_point_name",
        width: "150px",
      },
      {
        name: "User",
        cell: (row) => (
          <NavLink
            to={Routes.user_details.navTo(row?.user?.id)}
            style={{ color: "black" }}
            className="hover_underline"
          >
            {row?.user?.first_name} {row?.user?.last_name}
          </NavLink>
        ),
      },
      {
        name: "N.O. Movers",
        center: true,
        cell: (row) => row?.movers?.length ?? 0,
      },
      {
        name: "",
        button: true,
        right: true,
        cell: (row) => (
          <NavLink to={Routes.move_details.navTo(row?.id)}>
            <GrView size={22} />
          </NavLink>
        ),
      },
    ],
    []
  );
};

export default useTableColumns;
