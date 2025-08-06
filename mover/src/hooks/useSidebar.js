import { useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

export const useSidebar = (minWidthToBreack = 1199) => {
  const [sidebarDocked, setSidebarDocked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= minWidthToBreack) {
      setSidebarDocked(true);
      setSidebarOpen(false);
    } else {
      setSidebarDocked(false);
      setSidebarOpen(false);
    }
  }, [width, minWidthToBreack]);

  return { sidebarDocked, sidebarOpen, setSidebarOpen };
};
