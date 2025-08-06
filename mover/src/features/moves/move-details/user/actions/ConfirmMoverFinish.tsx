import React from "react";
import Button from "@/components/Button";
import { Mover } from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useConfirmMoverFinish } from "../api";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { customModalStyles } from "../styles/modalStyles";
import colors from "@/assets/scss/colors.module.scss";

type IProps = {
  move_id: number;
  mover: Mover;
};

const ConfirmMoverFinish = ({ move_id, mover }: IProps) => {
  const confirmPopup = usePopup();
  const { mutate: confirmFinishMover, isLoading } = useConfirmMoverFinish({
    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "An Error occured, Please try again."
      );
    },
  });

  if (!mover.pivot.is_finished || mover.pivot.confirm_finished) {
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
        Confirm Finish
      </Button>
      <Modal
        closeTimeoutMS={200}
        style={customModalStyles}
        isOpen={confirmPopup.isOpen}
        onRequestClose={confirmPopup.handleClose}
        contentLabel="Confirm Mover Finish"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Confirm <span style={{ color: colors.primary }}>Mover Finish?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          Mover{" "}
          <strong>
            {mover.first_name} {mover.last_name}
          </strong>
          , will be confirmed for finishing the move
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
              confirmFinishMover({ move_id, mover_id: mover.id });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmMoverFinish;
