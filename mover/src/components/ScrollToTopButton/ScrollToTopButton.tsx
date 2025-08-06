import React from "react";
import Button from "@/components/Button";

import styles from "./ScrollToTopButton.module.scss";
import useIsScrolledFromTop from "@/hooks/useIsScrolledFromTop";
import { scrollToTop } from "@/utility/scrollToTop";

import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTopButton = () => {
  const isScrolled = useIsScrolledFromTop();

  return (
    <Button
      onClick={scrollToTop}
      className={`${styles.btn} ${isScrolled ? styles.scrolled : ""}`}
    >
      <AiOutlineArrowUp size={24} color="#fff" />
    </Button>
  );
};

export default ScrollToTopButton;
