import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useFinishMove } from "../api";
import Modal from "react-modal";
import { toast } from "react-toastify";
import colors from "@/assets/scss/colors.module.scss";
import { MOVE_STATUS_ENUM } from "@/constants/move_status";

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
  move: Move;
};

const FinishMoveButton = ({ move }: IProps) => {
  const finishMoveButton = usePopup();
  const { mutate: finishMove, isLoading } = useFinishMove({
    onSuccess: () => {
      toast.success("Move has been finished successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "An Error occured while finishing the move"
      );
    },
  });

  if (move.move_status.key !== MOVE_STATUS_ENUM.STARTED) {
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
          onClick={finishMoveButton.handleOpen}
        >
          Finish Move
        </Button>
      </div>

      <Modal
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={finishMoveButton.isOpen}
        onRequestClose={finishMoveButton.handleClose}
        contentLabel="Finish Move"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Finish <span style={{ color: colors.primary }}>Move?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          This will finish the move, the move status will be changed to DONE
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
            onClick={finishMoveButton.handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              finishMoveButton.handleClose();
              finishMove({ move_id: move.id });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FinishMoveButton;
