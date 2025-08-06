import React from "react";

import { MdMenu } from "react-icons/md";
import Chats from "./chat/Chats";
import styles from "./Navbar.module.scss";
import NavbarUser from "./NavbarUser";
import Notifications from "./notifications/Notifications";

type IProps = {
  sidebarDocked: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ sidebarDocked, sidebarOpen, setSidebarOpen }: IProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.menu_container}>
        {sidebarDocked && (
          <MdMenu
            onClick={() => setSidebarOpen(true)}
            color={"#9b3543"}
            size={26}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div style={{ display: "flex", gap: "0rem", alignItems: "center" }}>
        <Chats />
        <Notifications />
        <div style={{ marginInlineStart: ".5rem" }}>
          <NavbarUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
