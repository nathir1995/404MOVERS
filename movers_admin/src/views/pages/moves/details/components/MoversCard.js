import DataTable from "components/table/DataTable";
import VerticalTable from "components/table/VerticalTable";
import { Routes } from "configs/Routes";
import { ACCOUNT_TYPE } from "enums/Account_Types";
import { useModal } from "hooks";
import { GrView } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap";
import { formatDateTime } from "../../utils/moveDate.util";
import TrackMap from "./tracking/TrackMap";

const typeBadgeClassname = {
  Labor: "primary",
  Driver: "secondary",
};

const getNavTo = (userRole) => {
  if (userRole === ACCOUNT_TYPE.DRIVER) return Routes.driver_details.navTo;
  if (userRole === ACCOUNT_TYPE.LABOR) return Routes.labor_details.navTo;
};

const moversColumns = [
  {
    name: "Role",
    cell: (row) => (
      <Badge color={typeBadgeClassname[row?.user_role?.value]}>
        {row?.user_role?.value}
      </Badge>
    ),
    maxWidth: "100px",
  },
  {
    name: "Name",
    cell: (row) => `${row.first_name} ${row.last_name}`,
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
    name: "Started",
    cell: (row) => {
      if (!row.pivot.is_started) {
        return "-";
      }
      return (
        <div>
          <div>{formatDateTime(row.pivot.started_at)}</div>
          {row.pivot.confirm_started && (
            <div style={{ fontSize: "smaller" }}>
              Confirmed: {formatDateTime(row.pivot.confirm_started_at)}
            </div>
          )}
        </div>
      );
    },
  },
  {
    name: "Finished",
    cell: (row) => {
      if (!row.pivot.is_finished) {
        return "-";
      }
      return (
        <div>
          <div>{formatDateTime(row.pivot.finished_at)}</div>
          {row.pivot.confirm_finished && (
            <div style={{ fontSize: "smaller" }}>
              Confirmed: {formatDateTime(row.pivot.confirm_finished_at)}
            </div>
          )}
        </div>
      );
    },
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

const MoversCard = ({ move }) => {
  const trackPopup = useModal();

  return (
    <>
      <Modal isOpen={trackPopup.isOpen} centered size="lg">
        <ModalHeader toggle={trackPopup.toggleModal}>Track Movers</ModalHeader>
        <TrackMap move={move} />
      </Modal>
      <Card>
        <CardFooter className="d-flex justify-content-between">
          <h5 className="m-0">Movers ({move.movers?.length} Involved)</h5>
          <Button
            color="primary"
            outline
            type="button"
            disabled={!move.movers?.length}
            onClick={trackPopup.openModal}
          >
            Track
          </Button>
        </CardFooter>
        <CardBody>
          <Row>
            <Col>
              <VerticalTable
                paddingBlock=".5rem"
                details={[
                  {
                    label: "Requested",
                    value: `${move.number_of_drivers} Drivers / ${move.number_of_labors} Labors`,
                  },
                ]}
              />
            </Col>
            <Col>
              <VerticalTable
                paddingBlock=".5rem"
                details={[
                  {
                    label: "Remaining",
                    value: `${move.remaining_number_of_drivers} Drivers / ${move.remaining_number_of_labors} Labors`,
                  },
                ]}
              />
            </Col>
          </Row>
          <DataTable columns={moversColumns} data={move.movers || []} />
        </CardBody>
      </Card>
    </>
  );
};

export default MoversCard;
