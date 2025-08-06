import React from "react";

const useElementIsVisible = (elementRef) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const currentRef = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [elementRef]);

  return isVisible;
};

export default useElementIsVisible;
