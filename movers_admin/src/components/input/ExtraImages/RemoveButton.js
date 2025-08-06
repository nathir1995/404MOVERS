import React from "react";

import { Button } from "reactstrap";
import { MdClose } from "react-icons/md";

const RemoveButton = ({ onClick }) => {
  return (
    <Button
      style={{
        padding: ".35rem",
        position: "absolute",
        top: 0,
        right: 0,
        transform: "translate(25%, -25%)",
      }}
      color="danger"
      type="button"
      onClick={onClick}
    >
      <MdClose size={18} />
    </Button>
  );
};

export default RemoveButton;
