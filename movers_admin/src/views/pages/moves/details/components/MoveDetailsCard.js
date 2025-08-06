import React from "react";
import { COLORS, LABELS } from "enums/Move_Status";
import { Badge, Card, CardBody, CardFooter } from "reactstrap";
import VerticalTable from "components/table/VerticalTable";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";
import { formatDateTime } from "../../utils/moveDate.util";

const MoveDetailsCard = ({ move }) => {
  const moveDetails = React.useMemo(
    () => [
      {
        label: "User",
        value: (
          <NavLink
            to={Routes.user_details.navTo(move?.user?.id)}
            style={{ color: "black" }}
            className="hover_underline"
          >
            {move?.user?.first_name} {move?.user?.last_name}
          </NavLink>
        ),
      },
      {
        label: "User Info",
        value: `Phone: ${move?.user?.phone_number ?? "-"} | Email: ${
          move?.user?.email ?? "-"
        }`,
      },
      {
        label: "Move Package",
        value: `${move.move_package?.name} ($${move.move_package?.price})`,
      },
      {
        label: "Expected Price",
        value: `$${move.expected_price}`,
      },
      {
        label: "Actual Price",
        value: move.actual_price ? `$${move.actual_price}` : "N/A",
      },
      {
        label: "Created At",
        value: formatDateTime(move.created_at),
      },
    ],
    [move]
  );
  const status = move.move_status?.key;

  return (
    <Card>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <h6 className="m-0">{formatDateTime(move.move_date_time)}</h6>
        <Badge style={{ backgroundColor: COLORS[status] }}>
          {LABELS[status] ?? status}
        </Badge>
      </CardFooter>
      <CardBody>
        <VerticalTable paddingBlock=".5rem" details={moveDetails} />
      </CardBody>
    </Card>
  );
};

export default MoveDetailsCard;
