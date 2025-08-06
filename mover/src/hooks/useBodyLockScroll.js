import { useEffect } from "react";

export const useBodyLockScroll = (condition) => {
  useEffect(() => {
    document.body.style.overflowY = condition ? "hidden" : "auto";
  }, [condition]);
};
