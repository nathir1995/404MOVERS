import { User } from "@/features/auth/utils/AuthContextType";

import colors from "@/assets/scss/colors.module.scss";
import styles from "../MoveDetails.module.scss";

import Button from "@/components/Button";
import useAuth from "@/features/auth/utils/useAuth";
import usePopup from "@/hooks/usePopup";
import useContactUser from "@/layout/user-layout/chat/useContactUser";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    zIndex: 1100,
    background: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    padding: "1rem",
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
    width: "min(90%, 20rem)",
  },
};

type IProps = {
  movers: User[];
  mover_type: "Driver" | "Labor";
};

const AcceptedMovers = ({ movers, mover_type }: IProps) => {
  const { user } = useAuth();
  const detailsPopup = usePopup();

  const { canContact, handleContact, isCreatingChat } = useContactUser();

  return (
    <>
      <span>
        ({movers.length} Accepted){" "}
        {movers.length > 0 && (
          <button
            type="button"
            className={styles.view_accepted_movers_btn}
            onClick={detailsPopup.handleOpen}
          >
            View
          </button>
        )}
      </span>

      <Modal
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={detailsPopup.isOpen}
        onRequestClose={detailsPopup.handleClose}
        contentLabel="Movers Details"
        ariaHideApp={false}
      >
        <div>
          <h5>
            Accepted{" "}
            <span style={{ color: colors.primary }}>{mover_type}s</span>
          </h5>
          <hr />
          <ul style={{ marginBlock: "1rem", marginInlineStart: "1em" }}>
            {movers.map((mover) => (
              <li key={mover.id}>
                <p>
                  {mover.first_name} {mover.last_name}{" "}
                  {mover.id === user?.id ? (
                    <span className={styles.me_chip}>Me</span>
                  ) : (
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: ".8em",
                        color: colors.primary,
                        fontWeight: 700,
                      }}
                      onClick={() => {
                        if (canContact) {
                          detailsPopup.handleClose();
                          handleContact(mover.id);
                        }
                      }}
                    >
                      {isCreatingChat ? "Loading..." : "Contact"}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
          <Button
            variant="outlined"
            type="button"
            onClick={detailsPopup.handleClose}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AcceptedMovers;
