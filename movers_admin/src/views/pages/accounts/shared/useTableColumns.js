import React from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";
import { GrView } from "react-icons/gr";
import AccountStatusChip from "components/smart/AccountStatusChip";
import { ACCOUNT_TYPE } from "enums/Account_Types";
import { Badge } from "reactstrap";

const getNavTo = (userRole) => {
  if (userRole === ACCOUNT_TYPE.DRIVER) return Routes.driver_details.navTo;
  if (userRole === ACCOUNT_TYPE.USER) return Routes.user_details.navTo;
  if (userRole === ACCOUNT_TYPE.LABOR) return Routes.labor_details.navTo;
};

const typeBadgeClassname = {
  Labor: "primary",
  Driver: "secondary",
  User: "warning",
};

const useTableColumns = ({ showUserType = false } = {}) => {
  return React.useMemo(() => {
    const columns = [
      {
        name: "Status",
        cell: (row) => (
          <AccountStatusChip status={row.mover_account_status?.key} />
        ),
      },
      {
        name: `First Name`,
        selector: "first_name",
      },
      {
        name: `Last Name`,
        selector: "last_name",
      },
      {
        name: "Email",
        selector: "email",
      },
      {
        name: "Phone",
        selector: "phone_number",
      },
      {
        name: "",
        right: true,
        button: true,
        cell: (row) => {
          const userRole = row?.user_role?.key;
          const navTo = getNavTo(userRole);
          if (!navTo) return null;

          return (
            <NavLink to={navTo?.(row.id)}>
              <GrView size={22} />
            </NavLink>
          );
        },
      },
    ];

    if (showUserType) {
      return [
        {
          name: "Type",
          cell: (row) => (
            <Badge color={typeBadgeClassname[row?.user_role?.value]}>
              {row?.user_role?.value}
            </Badge>
          ),
          maxWidth: "100px",
        },
        ...columns,
      ];
    }

    return columns;
  }, [showUserType]);
};

export default useTableColumns;
