import React from "react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import classes from "./Navbar.module.scss";

interface Iprops {
  sidebarDocked: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (newValue: boolean) => void;
}

const ToggleIcon = ({ sidebarDocked, sidebarOpen, setSidebarOpen }: Iprops) => {
  if (!sidebarDocked) return null;

  if (sidebarOpen) {
    return (
      <li className={classes.language_and_icon_container}>
        <MdClose
          onClick={() => setSidebarOpen(false)}
          className={classes.menu_icon}
          size={34}
        />
      </li>
    );
  } else {
    return (
      <li className={classes.language_and_icon_container}>
        <BiMenu
          onClick={() => setSidebarOpen(true)}
          className={classes.menu_icon}
          size={34}
        />
      </li>
    );
  }
};

export default ToggleIcon;
