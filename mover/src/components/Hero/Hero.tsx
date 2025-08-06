import React from "react";

import styles from "./Hero.module.scss";

interface IProps {
  backgroundImageSrc?: string;
  children: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
}

const Hero = ({
  backgroundImageSrc,
  containerClassName = "",
  contentClassName = "",
  children,
}: IProps) => {
  return (
    <div
      className={`${styles.container} ${containerClassName}`}
      style={
        backgroundImageSrc
          ? { backgroundImage: `url(${backgroundImageSrc})` }
          : {}
      }
    >
      <div className={`page__content ${styles.content} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
