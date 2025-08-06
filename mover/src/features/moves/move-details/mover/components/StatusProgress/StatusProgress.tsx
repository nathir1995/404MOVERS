import React from "react";
import { Mover } from "@/models/Move/Move.model";
import styles from "./StatusProgress.module.scss";
import { BsCheckLg } from "react-icons/bs";
import { formatDateTime } from "@/utility/date";

type IProps = {
  mover: Mover;
};

const StatusProgress = ({ mover }: IProps) => {
  const steps = React.useMemo(
    () => [
      {
        label: "Started At",
        description: mover.pivot.is_started
          ? formatDateTime(mover.pivot.started_at!)
          : "N/A",
        isActive: mover.pivot.is_started,
        withDivider: true,
      },
      {
        label: "Start Confirmation",
        description: mover.pivot.confirm_started
          ? formatDateTime(mover.pivot.confirm_started_at!)
          : "Pending",
        isActive: mover.pivot.confirm_started,
        withDivider: false,
      },
      {
        label: "Finished At",
        description: mover.pivot.is_finished
          ? formatDateTime(mover.pivot.finished_at!)
          : "N/A",
        isActive: mover.pivot.is_finished,
        withDivider: true,
      },
      {
        label: "Finish Confirmation",
        description: mover.pivot.confirm_finished
          ? formatDateTime(mover.pivot.confirm_finished_at!)
          : "Pending",
        isActive: mover.pivot.confirm_finished,
        withDivider: false,
      },
    ],
    [mover]
  );

  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div
            className={`${styles.step_container} ${
              step.isActive ? styles.active : ""
            }`}
          >
            <div className={styles.check_indicator}>
              <BsCheckLg color="#fff" />
            </div>
            <div>
              <h6>{step.label}</h6>
              <p>{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`${styles.divider} ${
                step.isActive ? styles.active : ""
              }`}
              data-no-divider={!step.withDivider}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusProgress;
