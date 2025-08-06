import { useState } from "react";

export const useModal = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, toggleModal, openModal, closeModal, setIsOpen };
};
