import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";

export const useEmailJS = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = useCallback((values) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        values,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setIsSuccess(true);
        },
        (error) => {
          console.log("ERROR IN SENDING EMAIL: ", error.text);
          setError(error.text);
          setIsError(true);
        }
      )
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    sendEmail,
  };
};
