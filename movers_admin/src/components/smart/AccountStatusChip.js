import React from "react";
import { Badge } from "reactstrap";

import { COLORS, LABELS } from "enums/Account_Status";

const AccountStatusChip = ({ status }) => {
  return (
    <Badge style={{ backgroundColor: COLORS[status] }}>
      {LABELS[status] ?? status}
    </Badge>
  );
};

export default AccountStatusChip;
