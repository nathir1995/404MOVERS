import { useEffect } from "react";

export const useAutoClosingModal = (
  mutation,
  closeModal,
  resetMutation = false
) => {
  useEffect(() => {
    if (mutation.isSuccess) {
      closeModal();
      if (resetMutation) {
        mutation.reset();
      }
    }
    //eslint-disable-next-line
  }, [mutation.isSuccess, resetMutation, closeModal]);
};
