import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import DataTable from "components/table/DataTable";

const itemsColumns = [
  { name: "Name", selector: "name" },
  { name: "Quantity", cell: (row) => `x${row.pivot.quantity}`, center: true },
  { name: "Unit Price", cell: (row) => `$${row.unit_price}`, center: true },
  { name: "Category", cell: (row) => row?.item_category?.name },
];

const ItemsCard = ({ move }) => {
  return (
    <Card>
      <CardFooter>
        <h6 className="m-0">Items ({move.items?.length})</h6>
      </CardFooter>
      <CardBody className="p-0">
        <DataTable columns={itemsColumns} data={move.items || []} />
      </CardBody>
    </Card>
  );
};

export default ItemsCard;
