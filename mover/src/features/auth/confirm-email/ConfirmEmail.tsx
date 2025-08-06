import React from "react";

import { MdEmail } from "react-icons/md";
import colors from "@/assets/scss/colors.module.scss";
import styles from "./ConfirmEmail.module.scss";

import AuthCode from "react-auth-code-input";
import Button from "@/components/Button";

import ResendButton from "./ResendButton";
import { MAX_CODE_LENGTH } from "./utils";
import {
  useSendVerificationCode,
  useVerifyEmail,
} from "@/api/email-verification/emailVerification.hooks";

type IProps = {
  emailToConfirm: string;
  onConfirmed?: Function;
};

const ConfirmEmail = ({ emailToConfirm, onConfirmed }: IProps) => {
  const [code, setCode] = React.useState<string>("");
  const [canResend, setCanResend] = React.useState<boolean>(true);

  const verifyEmailMutation = useVerifyEmail({
    onSuccess: () => {
      onConfirmed?.();
    },
  });
  const resendCodeMutation = useSendVerificationCode({
    onSuccess: () => {
      setCode("");
    },
  });

  const isValid = code.length === MAX_CODE_LENGTH;
  const handleVerify = () => {
    verifyEmailMutation.mutate({ email: emailToConfirm, code });
  };

  const handleResend = () => {
    if (canResend) {
      resendCodeMutation.mutate({ email: emailToConfirm });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MdEmail size={38} color={colors.primary} />
        <h5>Verify your email address</h5>
      </div>
      <hr className={styles.divider} />
      <h6 className={styles.sent_message}>
        A verification code has been sent to <br />
        {emailToConfirm}
      </h6>
      <p className={styles.check_description}>
        Please check your inbox and enter the verification code below to verify
        your email address. The code will expire in 7 minutes.
      </p>

      <AuthCode
        onChange={setCode}
        length={MAX_CODE_LENGTH}
        allowedCharacters="numeric"
        containerClassName={styles.code_container}
        inputClassName={styles.code_input}
        disabled={verifyEmailMutation.isLoading}
        autoFocus
      />

      {verifyEmailMutation.isError && (
        <h6 className={styles.error_message}>
          {verifyEmailMutation.error_message ||
            "An Error occured while verifying the email address"}
        </h6>
      )}

      <Button
        isDisabled={!isValid}
        isLoading={verifyEmailMutation.isLoading}
        className={styles.verify_btn}
        type="button"
        onClick={handleVerify}
      >
        Verify
      </Button>

      <ResendButton
        isDisabled={verifyEmailMutation.isLoading}
        isLoading={resendCodeMutation.isLoading}
        isSuccess={resendCodeMutation.isSuccess}
        isError={resendCodeMutation.isError}
        error_message={resendCodeMutation.error_message}
        canResend={canResend}
        onResend={handleResend}
        setCanResend={setCanResend}
      />
    </div>
  );
};

export default ConfirmEmail;
