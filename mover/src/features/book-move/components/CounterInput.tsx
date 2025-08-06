import React from "react";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type IProps = {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
};

const buttonStyles: React.CSSProperties = {
  padding: ".75rem",
  aspectRatio: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CounterInput = ({
  label,
  value,
  onIncrease,
  onDecrease,
  disabled = false,
}: IProps) => {
  return (
    <div className={styles.counter_container}>
      <label>{label}</label>
      <div className={styles.counter_input_container}>
        <Button
          type="button"
          onClick={onDecrease}
          style={buttonStyles}
          isDisabled={disabled}
        >
          <AiOutlineMinus size={16} color="#fff" />
        </Button>
        <p>{value}</p>
        <Button
          type="button"
          onClick={onIncrease}
          style={buttonStyles}
          isDisabled={disabled}
        >
          <AiOutlinePlus size={16} color="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default CounterInput;
