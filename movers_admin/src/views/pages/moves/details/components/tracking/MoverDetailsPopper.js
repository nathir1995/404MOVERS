import { Button } from "reactstrap";
import styles from "./MoverDetailsPopper.module.scss";

const MoverDetailsPopper = ({ mover, onClose }) => {
  return (
    <div className={styles.container} data-is-open={mover !== null}>
      {mover !== null && (
        <>
          <p className={styles.role_badge}>{mover.user_role.key}</p>
          <h5>
            {mover.first_name} {mover.last_name}
          </h5>
          <h6>
            Phone:{" "}
            {mover.phone_number ? (
              <a
                href={`tel:${mover.phone_number}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {mover.phone_number}
              </a>
            ) : (
              "N/A"
            )}
          </h6>
          <Button
            type="button"
            onClick={onClose}
            style={{ padding: ".5rem 1rem", marginTop: ".5rem" }}
            variant="outlined"
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default MoverDetailsPopper;
