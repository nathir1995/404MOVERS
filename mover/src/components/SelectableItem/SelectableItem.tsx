import React from "react";

import styles from "./SelectableItem.module.scss";

type IProps = React.ComponentProps<"button"> & {
  isSelected?: boolean;
};

const SelectableItem = ({
  isSelected = false,
  className = "",
  ...props
}: IProps) => {
  return (
    <button
      type="button"
      className={`${styles.item} ${
        isSelected ? styles.selected : ""
      } ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default SelectableItem;
