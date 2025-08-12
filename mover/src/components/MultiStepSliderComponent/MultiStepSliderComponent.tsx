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
  // ✅ FIXED: Safe children array handling
  const childrenArray = React.useMemo(() => {
    const childArray = React.Children.toArray(children);
    return Array.isArray(childArray) ? childArray : [];
  }, [children]);

  // ✅ FIXED: Bounds checking for activeStep
  const safeActiveStep = React.useMemo(() => {
    if (childrenArray.length === 0) return 0;
    if (activeStep < 0) return 0;
    if (activeStep >= childrenArray.length) return childrenArray.length - 1;
    return activeStep;
  }, [activeStep, childrenArray.length]);

  // ✅ FIXED: Early return if no children
  if (childrenArray.length === 0) {
    return (
      <div className={styles.outside_container} style={containerStyles}>
        <div className={childClassName}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No content available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outside_container} style={containerStyles}>
      <SwitchTransition>
        <CSSTransition
          key={safeActiveStep}
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
          <div className={childClassName}>
            {childrenArray[safeActiveStep] || <div>Content not found</div>}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default MultiStepSliderComponent;
