import React from "react";
import { confirmAlert } from "react-confirm-alert";
import SweetAlert from "react-bootstrap-sweetalert";

export default function CustomConfirmAlert({
  title,
  status,
  message,
  stackTrace,
}) {
  confirmAlert({
    customUI: ({ onClose }) => (
      <CustomUI
        onClose={onClose}
        status={status}
        message={message}
        stackTrace={stackTrace}
        title={title}
      />
    ),
  });
}

function CustomUI({ onClose, title = "Error", status, message, stackTrace }) {
  return (
    <SweetAlert
      danger
      title={title}
      show={true}
      confirmBtnText="OK"
      onConfirm={onClose}
    >
      <div>
        {status && <h3>Status Code: {status}</h3>}
        <p>{message}</p>
        {stackTrace && <pre style={{ textAlign: "start" }}>{stackTrace}</pre>}
      </div>
    </SweetAlert>
  );
}
