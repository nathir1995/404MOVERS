import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useFinishMove } from "../api";
import useAuth from "@/features/auth/utils/useAuth";
import { checkIfMoverCanFinish } from "./permissions";
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

const useCanFinishMove = (move: Move): boolean => {
  const { role, user } = useAuth();
  return React.useMemo(
    () => checkIfMoverCanFinish(move, role!, user!),
    [role, move, user]
  );
};

const FinishMoveButton = ({ move }: IProps) => {
  const finishMovePopup = usePopup();
  const { mutate: finishMove, isLoading } = useFinishMove({
    onSuccess: () => {
      toast.success(
        "A finish request has been submitted, waiting for user confirmation"
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "An Error occured while finishing the move"
      );
    },
  });
  const canFinishMove = useCanFinishMove(move);

  if (!canFinishMove) {
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
        onClick={finishMovePopup.handleOpen}
      >
        Finish Move
      </Button>

      <Modal
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={finishMovePopup.isOpen}
        onRequestClose={finishMovePopup.handleClose}
        contentLabel="Finish Move"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Finish <span style={{ color: colors.primary }}>Move?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          This will request a user confirmation for finishing the move
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
            onClick={finishMovePopup.handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              finishMovePopup.handleClose();
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
