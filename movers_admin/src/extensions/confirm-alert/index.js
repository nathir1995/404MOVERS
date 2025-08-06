import React from "react";
import { confirmAlert } from "react-confirm-alert";
import SweetAlert from "react-bootstrap-sweetalert";

export default function CustomConfirmAlert(options) {
  confirmAlert({
    customUI: ({ onClose }) => <CustomUI onClose={onClose} options={options} />,
  });
}

function CustomUI({ onClose, options }) {
  return (
    <SweetAlert
      title={options.title || `DELETE, Are you sure?`}
      warning
      show={true}
      showCancel
      reverseButtons
      cancelBtnBsStyle="danger"
      confirmBtnText={options.confirmBtnText || "Yes, delete it!"}
      cancelBtnText={options.cancelBtnText || "Cancel"}
      onConfirm={() => {
        options.onConfirm();
        onClose();
      }}
      onCancel={onClose}
    >
      {options.body || "You won't be able to revert this!"}
    </SweetAlert>
  );
}
