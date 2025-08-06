import React from "react";
import { useTranslation } from "utility/language";
import { Button } from "reactstrap";
import { Plus } from "react-feather";

export const AddButton = ({ children, ...props }) => {
  const t = useTranslation();

  return (
    <Button
      color="primary"
      {...props}
      className={`px-1 ${props.className ?? ""}`}
    >
      <Plus size={15} />
      <span style={{ marginLeft: "1px", marginRight: "1px" }}>
        {children || t("add")}
      </span>
    </Button>
  );
};
