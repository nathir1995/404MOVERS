import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import usePopup from "@/hooks/usePopup";
import { useAcceptMove } from "../api";
import useAuth from "@/features/auth/utils/useAuth";
import { checkIfMoverCanAccept } from "./permissions";
import colors from "@/assets/scss/colors.module.scss";
import Modal from "react-modal";
import { toast } from "react-toastify";

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

const useCanAcceptMove = (move: Move): boolean => {
  const { role, user } = useAuth();
  return React.useMemo(
    () => checkIfMoverCanAccept(move, role!, user!),
    [role, move, user]
  );
};

const AcceptMoveButton = ({ move }: IProps) => {
  const acceptPopup = usePopup();
  const { mutate: acceptMove, isLoading } = useAcceptMove({
    onSuccess: () => {
      toast.success("Move accepted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "An Error occured while accepting the move"
      );
    },
  });
  const canAcceptMove = useCanAcceptMove(move);

  if (!canAcceptMove) {
    return null;
  }
  return (
    <>
      <Button
        type="button"
        style={{
          padding: ".6rem .75rem",
        }}
        isLoading={isLoading}
        onClick={acceptPopup.handleOpen}
      >
        Accept
      </Button>

      <Modal
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={acceptPopup.isOpen}
        onRequestClose={acceptPopup.handleClose}
        contentLabel="Accept Move"
        ariaHideApp={false}
      >
        <h4 style={{ textAlign: "center" }}>
          Accept <span style={{ color: colors.primary }}>Move?</span>
        </h4>
        <p style={{ marginBlock: "1rem", textAlign: "center" }}>
          This move will be accepted by you.
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
            onClick={acceptPopup.handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              acceptPopup.handleClose();
              if (move?.id) {
                acceptMove({ move_id: move.id });
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

export default AcceptMoveButton;
