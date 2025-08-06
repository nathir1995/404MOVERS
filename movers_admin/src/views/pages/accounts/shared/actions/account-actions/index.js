import React from "react";
import { ACCOUNT_STATUSES } from "enums/Account_Status";
import RejectAccountAction from "./RejectAccountAction";
import ApproveAndRequestDocuments from "./ApproveAndRequestDocuments";

const AccountActions = ({ mover, type }) => {
  const status = mover?.mover_account_status?.key;

  if (status === ACCOUNT_STATUSES.ACCOUNT_APPROVED) {
    return null;
  }
  return (
    <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
      {status === ACCOUNT_STATUSES.ADMIN_APPROVAL_PENDING && (
        <ApproveAndRequestDocuments mover={mover} type={type} />
      )}
      {status !== ACCOUNT_STATUSES.ACCOUNT_REJECTED && (
        <RejectAccountAction mover={mover} type={type} />
      )}
    </div>
  );
};

export default AccountActions;
