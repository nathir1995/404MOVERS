import React from "react";

import classes from "./Numpad.module.scss";
import { MdBackspace } from "react-icons/md";

import { NUMPAD_OPTIONS } from "constants/numpad";
import useNumpad from "store/numpad/useNumpad";
import { useEventListener } from "hooks";

const Option = ({ label, optionValue }) => {
  const { selectedOption, setOption } = useNumpad();

  return (
    <button
      className={selectedOption === optionValue ? classes.selected : ""}
      onClick={() => setOption(optionValue)}
    >
      {label}
    </button>
  );
};

const RowOfNumbers = ({ numbers = [] }) => {
  const { appendDigit } = useNumpad();

  return (
    <>
      {numbers.map((number) => (
        <button key={number} onClick={() => appendDigit(number)}>
          <h4 className="m-0">{number}</h4>
        </button>
      ))}
    </>
  );
};

const Numpad = ({
  withOptions = true,
  withKeyboardInput = false,
  containerClassName = "",
}) => {
  const { eraseDigit, toggleSign, appendFloatingPoint, appendDigit } =
    useNumpad();

  useEventListener("keydown", (e) => {
    if (!withKeyboardInput) return;
    if (e.key === "-") {
      toggleSign();
    } else if (e.key === ".") {
      appendFloatingPoint();
    } else if (e.key === "Backspace") {
      eraseDigit();
    } else if (!isNaN(parseInt(e.key))) {
      appendDigit(e.key);
    }
  });

  return (
    <div
      className={`${classes.numpad_container} ${containerClassName}`}
      data-with-options={withOptions}
    >
      {withOptions ? (
        <Option label="QTY" optionValue={NUMPAD_OPTIONS.QTY} />
      ) : (
        <div />
      )}
      <RowOfNumbers numbers={[1, 2, 3]} />
      {withOptions ? (
        <Option label="% Disc" optionValue={NUMPAD_OPTIONS.DISC} />
      ) : (
        <div />
      )}
      <RowOfNumbers numbers={[4, 5, 6]} />
      {withOptions ? (
        <Option label="Price" optionValue={NUMPAD_OPTIONS.PRICE} />
      ) : (
        <div />
      )}
      <RowOfNumbers numbers={[7, 8, 9]} />

      <button onClick={eraseDigit}>
        <h4 className="m-0">
          <MdBackspace />
        </h4>
      </button>
      <button onClick={toggleSign}>
        <h4 className="m-0">+/-</h4>
      </button>
      <RowOfNumbers numbers={[0]} />
      <button onClick={appendFloatingPoint}>
        <h4 className="m-0">.</h4>
      </button>
    </div>
  );
};

export default Numpad;
