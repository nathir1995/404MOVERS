import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useStartMove } from "../api";
import useAuth from "@/features/auth/utils/useAuth";
import { checkIfMoverCanStart } from "./permissions";
import Modal from "react-modal";
import { toast } from "react-toastify";
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
  move: Move;
};

const useCanStartMove = (move: Move): boolean => {
  const { role, user } = useAuth();
  return React.useMemo(
    () => checkIfMoverCanStart(move, role!, user!),
    [role, move, user]
  );
};

const StartMoveButton = ({ move }: IProps) => {
  const startMovePopup = usePopup();
  const { mutate: startMove, isLoading } = useStartMove({
    onSuccess: () => {
      toast.success(
        "A start request has been submitted, waiting for user confirmation"
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "An Error occured while starting the move"
      );
    },
  });
  const canAcceptMove = useCanStartMove(move);

  if (!canAcceptMove) {
    return null;
  }
  return (
    <>
      <Button
        type="button"
        style={{
          padding: ".65rem 1rem",
        }}
        isLoading={isLoading}
        onClick={startMovePopup.handleOpen}
      >
        Start Move
      </Button>

      <Modal
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={startMovePopup.isOpen}
        onRequestClose={startMovePopup.handleClose}
        contentLabel="Start Move"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Start <span style={{ color: colors.primary }}>Move?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          This will request a user confirmation for starting the move
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
              if (move?.id) {
                startMove({ move_id: move.id });
              }
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
