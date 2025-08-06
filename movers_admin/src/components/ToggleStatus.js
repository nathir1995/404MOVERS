import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useTranslation } from "utility/language";
import AuthComponent from "components/AuthComponent";
import StatusBadge from "components/StatusBadge";

export const ToggleStatus = ({ object, toggleMutation, ...props }) => {
  const t = useTranslation();

  const handleSwitch = () => {
    toggleMutation.mutate({
      ...object,
      id: object.id,
      new_status: !object.active,
    });
  };

  return (
    <AuthComponent notAuthRender={() => <StatusBadge status={object.active} />}>
      <div className="p-0">
        <p
          className="mb-0 p-0"
          style={{ whiteSpace: "nowrap", textAlign: "center" }}
        >
          {object.active ? t("active") : t("inactive")}
        </p>
        <Toggle
          {...props}
          className="custom-switch"
          disabled={toggleMutation.isLoading}
          onChange={handleSwitch}
          checked={object.active ? true : false}
        />
      </div>
    </AuthComponent>
  );
};
