import React from "react";

export type PopupUtils = {
  isOpen: boolean;
  setIsOpen: (newValue: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
};

const usePopup = (initialValue: boolean = false): PopupUtils => {
  const [isOpen, setIsOpen] = React.useState(initialValue);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleToggle = React.useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const returnValue: PopupUtils = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      handleOpen,
      handleClose,
      handleToggle,
    }),
    [isOpen, setIsOpen, handleOpen, handleClose, handleToggle]
  );

  return returnValue;
};

export default usePopup;
