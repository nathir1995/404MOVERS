import React from "react";

import styles from "./MultiStepSliderComponent.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

type IProps = {
  activeStep: number;
  childClassName?: string;
  containerStyles?: React.CSSProperties;
} & React.ComponentProps<"div">;

const MultiStepSliderComponent = ({
  activeStep,
  children,
  childClassName = "",
  containerStyles = {},
}: IProps) => {
  // const nodeRef = React.useRef();
  const childrenArray = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  // const childrenLength = childrenArray.length;

  return (
    <div className={styles.outside_container} style={containerStyles}>
      {/* <div style={{ width: `calc(${childrenLength} * 100%)`, display: "flex" }}>
        {childrenArray.map((child, idx) => (
          <div
            className={`${styles.child} ${
              idx === activeStep ? styles.active : ""
            } ${childClassName}`}
            key={idx}
            style={{
              width: `calc(100% / ${childrenLength})`,
              transform: `translateX(calc(-100% * ${activeStep}))`,
            }}
          >
            {child}
          </div>
        ))}
      </div> */}
      {/* <div className={`${styles.child} ${childClassName}`}>
        {childrenArray[activeStep]}
      </div> */}

      <SwitchTransition>
        <CSSTransition
          key={activeStep}
          // nodeRef={nodeRef}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames={{
            enter: styles.fade_enter,
            exit: styles.fade_exit,
            enterActive: styles.fade_enter_active,
            exitActive: styles.fade_exit_active,
          }}
        >
          <div className={childClassName}>{childrenArray[activeStep]}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default MultiStepSliderComponent;
