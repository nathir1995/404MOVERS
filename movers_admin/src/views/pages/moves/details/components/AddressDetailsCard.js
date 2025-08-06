import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import VerticalTable from "components/table/VerticalTable";

const AddressDetailsCard = ({ move }) => {
  const addressDetails = React.useMemo(
    () => [
      { label: "Start Point", value: move?.start_point_name },
      { label: "Start Building N.", value: move?.start_building_number },
      { label: "End Point", value: move?.end_point_name },
      { label: "End Building N.", value: move?.end_building_number },
      { label: "Instructions", value: move?.instruction ?? "-" },
    ],
    [move]
  );

  return (
    <Card>
      <CardFooter>
        <h6 className="m-0">Address Details</h6>
      </CardFooter>
      <CardBody>
        <VerticalTable paddingBlock=".5rem" details={addressDetails} />
      </CardBody>
    </Card>
  );
};

export default AddressDetailsCard;
