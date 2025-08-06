import AccountStatusChip from "components/smart/AccountStatusChip";
import { ACCOUNT_STATUSES } from "enums/Account_Status";
import React from "react";
import Select from "react-select";

const statusOptions = [
  { label: "All", value: "" },
  ...Object.keys(ACCOUNT_STATUSES).map((key) => ({
    label: <AccountStatusChip status={ACCOUNT_STATUSES[key]} />,
    value: key,
  })),
];

const MoverStatusSelect = ({ onChange }) => {
  return (
    <div style={{ width: "15rem" }} className="mover-status-select">
      <Select
        placeholder={"Account Status"}
        options={statusOptions}
        name="status"
        onChange={(opt) => onChange?.(opt.value)}
        isSearchable={false}
        classNamePrefix="mover-status-select"
      />
    </div>
  );
};

export default MoverStatusSelect;
