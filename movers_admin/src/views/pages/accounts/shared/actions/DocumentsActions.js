import React from "react";
// import { ACCOUNT_STATUSES } from "enums/Account_Status";
import { Button } from "reactstrap";

const DocumentsActions = ({ mover }) => {
  // const labor_id = labor?.id;

  return (
    <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
      <Button type="button" color="success">
        Approve Documents
      </Button>
      <Button type="button" color="danger">
        Reject Documents
      </Button>
    </div>
  );
};

export default DocumentsActions;
