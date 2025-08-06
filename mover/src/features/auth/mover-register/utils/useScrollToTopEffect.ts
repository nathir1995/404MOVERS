import React from "react";

const useScrollToTopEffect = (activeStep: number) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  return null;
};

export default useScrollToTopEffect;
