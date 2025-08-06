import React from "react";
import { useEventListener } from "./useEventListener";

const SCROLL_Y = 10;

const useIsScrolledFromTop = () => {
  const [isScrolledFromTop, setIsScrolledFromTop] = React.useState(false);

  const handler = React.useCallback(() => {
    if (window.scrollY >= SCROLL_Y) {
      setIsScrolledFromTop(true);
    } else {
      setIsScrolledFromTop(false);
    }
  }, []);

  React.useEffect(handler, [handler]);
  useEventListener("scroll", handler);

  return isScrolledFromTop;
};

export default useIsScrolledFromTop;
