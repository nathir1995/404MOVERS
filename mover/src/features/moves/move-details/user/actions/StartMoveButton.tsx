import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useStartMove } from "../api";
import Modal from "react-modal";
import { toast } from "react-toastify";
import colors from "@/assets/scss/colors.module.scss";
import { MOVE_STATUS_ENUM } from "@/constants/move_status";
import { customModalStyles } from "../styles/modalStyles";

type IProps = {
  move: Move;
};

const StartMoveButton = ({ move }: IProps) => {
  const startMovePopup = usePopup();
  const { mutate: startMove, isLoading } = useStartMove({
    onSuccess: () => {
      toast.success("Move has been started successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "An Error occured while starting the move"
      );
    },
  });

  if (move.move_status.key !== MOVE_STATUS_ENUM.ONGOING) {
    return null;
  }
  return (
    <>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="button"
          style={{
            padding: ".6rem .75rem",
          }}
          isLoading={isLoading}
          onClick={startMovePopup.handleOpen}
        >
          Start Move
        </Button>
      </div>

      <Modal
        closeTimeoutMS={200}
        style={customModalStyles}
        isOpen={startMovePopup.isOpen}
        onRequestClose={startMovePopup.handleClose}
        contentLabel="Start Move"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Start <span style={{ color: colors.primary }}>Move?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          This will start the move, the move status will be changed to STARTED
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
            onClick={startMovePopup.handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              startMovePopup.handleClose();
              startMove({ move_id: move.id });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default StartMoveButton;
