import React from "react";
import { Mover } from "@/models/Move/Move.model";
import styles from "../styles/MoverDetailsPopper.module.scss";
import Button from "@/components/Button";

type IProps = {
  mover: Mover | null;
  onClose: () => void;
};

const MoverDetailsPopper = ({ mover, onClose }: IProps) => {
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
