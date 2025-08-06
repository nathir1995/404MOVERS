import React from "react";
import LOGO from "@/assets/images/logo2.png";
import { useSidebar } from "@/hooks/useSidebar";
import { useDebounce } from "@/hooks/useDebounce";
import classes from "./Navbar.module.scss";
import { useBodyLockScroll } from "@/hooks/useBodyLockScroll";
import ToggleIcon from "./ToggleIcon";
import LinksElements from "./LinksElements";

import Image from "next/image";
import Link from "next/link";

const BREAK_POINT = 1199;

const Navbar = () => {
  const { sidebarDocked, sidebarOpen, setSidebarOpen } =
    useSidebar(BREAK_POINT);
  const [showElements, setShowElements] = React.useState(false);

  useBodyLockScroll(sidebarOpen);

  useDebounce(
    () => {
      if (sidebarOpen) {
        setShowElements(true);
      } else {
        setShowElements(false);
      }
    },
    350,
    [sidebarOpen]
  );

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.navbar_header}>
          <Link href="/">
            <Image src={LOGO} alt="LOGO" className={classes.logo} />
          </Link>
          <div className={classes.links_conatiner} data-desktop="true">
            {!sidebarDocked && (
              <LinksElements setSidebarOpen={setSidebarOpen} />
            )}
            <ToggleIcon
              sidebarDocked={sidebarDocked}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </nav>
      </header>
      <div
        className={`${classes.docked_menu} ${classes.links_conatiner} ${
          sidebarOpen ? classes.docked_menu_active : ""
        }`}
      >
        {sidebarOpen && showElements && (
          <LinksElements setSidebarOpen={setSidebarOpen} />
        )}
      </div>
    </>
  );
};

export default Navbar;
