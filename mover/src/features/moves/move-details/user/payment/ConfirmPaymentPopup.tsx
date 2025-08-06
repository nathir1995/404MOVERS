import React from "react";
import Modal from "react-modal";
import { PopupUtils } from "@/hooks/usePopup";
import Button from "@/components/Button";

import colors from "@/assets/scss/colors.module.scss";

const customStyles = {
  overlay: {
    zIndex: 1100,
    background: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    padding: "1.5rem 1rem",
    border: "none",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "8px",

    zIndex: 1105,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90%",
    width: "min(90%, 30rem)",
  },
};

type IProps = {
  popup: PopupUtils;
  onConfirm: () => void;
  amount: number;
};

const ConfirmPaymentPopup = ({ popup, amount, onConfirm }: IProps) => {
  return (
    <Modal
      closeTimeoutMS={200}
      style={customStyles}
      isOpen={popup.isOpen}
      onRequestClose={popup.handleClose}
      contentLabel="Confirm Payment"
      ariaHideApp={false}
    >
      <h4 style={{ textAlign: "center" }}>
        Confirm <span style={{ color: colors.primary }}>Payment</span>
      </h4>
      <p style={{ marginBlock: "1rem", textAlign: "center" }}>
        If you proceed your credit card will be charged{" "}
        <span style={{ fontWeight: "bold" }}>${amount}</span>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Button variant="outlined" type="button" onClick={popup.handleClose}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            popup.handleClose();
            onConfirm();
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmPaymentPopup;
