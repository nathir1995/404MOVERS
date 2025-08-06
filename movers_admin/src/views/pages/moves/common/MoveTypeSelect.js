import React from "react";
import Select from "react-select";

export const moveTypeOptions = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

const MoveTypeSelect = ({ onChange }) => {
  return (
    <div style={{ width: "15rem" }} className="mover-status-select">
      <Select
        placeholder={"Move Type"}
        options={moveTypeOptions}
        name="status"
        onChange={(opt) => onChange?.(opt.value)}
        isSearchable={false}
        classNamePrefix="mover-status-select"
      />
    </div>
  );
};

export default MoveTypeSelect;
