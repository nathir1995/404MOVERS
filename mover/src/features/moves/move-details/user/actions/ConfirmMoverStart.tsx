import React from "react";
import Button from "@/components/Button";
import { Mover } from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useConfirmMoverStart } from "../api";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { customModalStyles } from "../styles/modalStyles";
import colors from "@/assets/scss/colors.module.scss";

type IProps = {
  move_id: number;
  mover: Mover;
};

const ConfirmMoverStart = ({ move_id, mover }: IProps) => {
  const confirmPopup = usePopup();
  const { mutate: confirmStartMover, isLoading } = useConfirmMoverStart({
    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "An Error occured, Please try again."
      );
    },
  });

  if (!mover.pivot.is_started || mover.pivot.confirm_started) {
    return "N/A";
  }
  return (
    <>
      <Button
        style={{ padding: ".35rem", fontSize: ".8em" }}
        variant="outlined"
        type="button"
        onClick={confirmPopup.handleOpen}
        isLoading={isLoading}
      >
        Confirm Start
      </Button>
      <Modal
        closeTimeoutMS={200}
        style={customModalStyles}
        isOpen={confirmPopup.isOpen}
        onRequestClose={confirmPopup.handleClose}
        contentLabel="Confirm Mover Start"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Confirm <span style={{ color: colors.primary }}>Mover Start?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          Mover{" "}
          <strong>
            {mover.first_name} {mover.last_name}
          </strong>
          , will be confirmed for starting the move
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="outlined"
            type="button"
            onClick={confirmPopup.handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              confirmPopup.handleClose();
              confirmStartMover({ move_id, mover_id: mover.id });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmMoverStart;
