import React from "react";
import { ValidatedField } from "components/input/ValidatedField";

const MovePackageForm = ({ editMode = false }) => {
  return (
    <>
      <ValidatedField
        name="name"
        label="Package Name"
        placeholder="Package Name"
      />
      <ValidatedField
        name="price"
        label="Package Price"
        placeholder="Package Price"
        type="number"
      />
      <ValidatedField
        name="description"
        label="Package Description"
        placeholder="Package Description"
        as="textarea"
      />
    </>
  );
};

export default MovePackageForm;
