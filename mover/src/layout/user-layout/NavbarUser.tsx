import React from "react";
import useAuth from "@/features/auth/utils/useAuth";
import classes from "./Navbar.module.scss";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useQueryClient } from "@tanstack/react-query";

const NavbarUser = () => {
  const queryClient = useQueryClient();
  const clearCach = () => queryClient.removeQueries();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleToggle = () => setIsOpen((v) => !v);
  const { user, logout, role } = useAuth();

  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={classes.user_container} ref={ref}>
      <button onClick={handleToggle}>
        <div className={classes.avatar}></div>
      </button>

      <div
        className={`${classes.dropdown_menu} ${isOpen ? classes.active : ""}`}
      >
        <h6 className={classes.user_name}>
          {user?.first_name} {user?.last_name}
        </h6>
        <p className={classes.company_name}>{role}</p>
        <hr />
        <ul>
          <li
            className={classes.dropdown_item}
            onClick={() => {
              setIsOpen(false);
              logout();
              clearCach();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarUser;
