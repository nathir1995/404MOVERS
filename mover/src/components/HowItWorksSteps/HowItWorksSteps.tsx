import React from "react";
import { Step } from "@/data/individualsSteps";
import Image from "next/image";
import styles from "./HowItWorksSteps.module.scss";

import { FadeIn } from "@/components/animation/FadeIn";
import useElementIsVisible from "@/hooks/useElementIsVisible";

interface IProps {
  steps: Step[];
}

const HowItWorksSteps = ({ steps }: IProps) => {
  const [activeStep, setActiveStep] = React.useState(1);

  const elementRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useElementIsVisible(elementRef);

  React.useEffect(() => {
    let intervalId: any = null;

    if (isVisible) {
      intervalId = setInterval(() => {
        setActiveStep((prev) => (prev % steps.length) + 1);
      }, 6000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };

    //eslint-disable-next-line
  }, [isVisible]);

  return (
    <div className={styles.container} ref={elementRef}>
      <div className={styles.img_wrapper}>
        {steps.map((step) => (
          <FadeIn show={step.id === activeStep} key={step.id}>
            <Image src={step.image} alt="" />
          </FadeIn>
        ))}
      </div>
      <div className={styles.steps_container}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step_wrapper} ${
              step.id === activeStep ? styles.step_wrapper_active : ""
            }`}
          >
            <button
              className={styles.id}
              onClick={() => setActiveStep(step.id)}
            >
              <h4>{step.id}</h4>
            </button>
            <div
              className={styles.step_texts}
              onClick={() => setActiveStep(step.id)}
            >
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSteps;
