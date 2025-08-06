import React from "react";
import { Table } from "reactstrap";

const VerticalTable = ({
  details,
  thWidth = "10rem",
  paddingBlock = "1rem",
}) => {
  return (
    <Table bordered>
      <tbody>
        {details.map(({ label, value }) => (
          <tr key={label}>
            <th
              style={{ width: thWidth, backgroundColor: "#eee", paddingBlock }}
            >
              {label}
            </th>
            <td style={{ paddingBlock }}>
              <strong>{value}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VerticalTable;
