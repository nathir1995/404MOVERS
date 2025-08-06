import React from "react";
import styles from "./ConfirmEmail.module.scss";
import colors from "@/assets/scss/colors.module.scss";

import { useTimer } from "react-timer-hook";
import { formatNumber, getExpiryTimeStamp } from "./utils";

import PulseLoader from "react-spinners/PulseLoader";

type IProps = {
  canResend: boolean;
  setCanResend: React.Dispatch<boolean>;
  isDisabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error_message?: string;
  onResend: Function;
};

const ResendButton = ({
  canResend,
  setCanResend,
  isDisabled,
  isLoading,
  isSuccess,
  isError,
  error_message,
  onResend,
}: IProps) => {
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: getExpiryTimeStamp(),
    autoStart: false,
    onExpire: () => setCanResend(true),
  });

  React.useEffect(() => {
    if (isSuccess) {
      restart(getExpiryTimeStamp(), true);
      setCanResend(false);
    }
    //eslint-disable-next-line
  }, [isSuccess]);

  return (
    <>
      <button
        disabled={!canResend || isDisabled || isLoading}
        className={styles.resend_code}
        type="button"
        onClick={() => {
          onResend();
        }}
      >
        {canResend
          ? "Resend Code"
          : `Resend in ${formatNumber(minutes)}:${formatNumber(seconds)}`}

        {isLoading && (
          <PulseLoader
            color={colors.primary}
            size={6}
            style={{ marginLeft: ".5rem" }}
          />
        )}
      </button>
      {isError && (
        <h6 className={styles.error_message} style={{ marginTop: ".5rem" }}>
          {error_message ||
            "An Error occured while resending the verification code"}
        </h6>
      )}
    </>
  );
};

export default ResendButton;
