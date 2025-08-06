import React from "react";
import { NavLink } from "react-router-dom";
import { Disc, X, Circle } from "react-feather";
import classnames from "classnames";
import LOGO from "assets/img/logo/logo_small.png";
import logo from "assets/img/logo/logo_2.png";
import { useDirection } from "utility/context/Layout";

const SidebarHeader = ({
  toggleSidebarMenu,
  activeTheme,
  collapsed,
  toggle,
  sidebarVisibility,
  menuShadow,
}) => {
  const dir = useDirection();
  const logoStyles =
    dir === "ltr" ? { marginRight: "10rem" } : { marginLeft: "10rem" };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item d-flex w-100">
          <NavLink to="/" className="navbar-brand mt-0 w-100">
            {!collapsed ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img width="175" src={logo} alt="" />
              </div>
            ) : (
              <img width="40" style={logoStyles} src={LOGO} alt="" />
            )}
          </NavLink>

          <div className="nav-link modern-nav-toggle">
            {collapsed === false ? (
              <Disc
                onClick={() => {
                  toggleSidebarMenu(true);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark",
                  }
                )}
                size={20}
                data-tour="toggle-icon"
              />
            ) : (
              <Circle
                onClick={() => {
                  toggleSidebarMenu(false);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark",
                  }
                )}
                size={20}
              />
            )}
            <X
              onClick={sidebarVisibility}
              className={classnames(
                "toggle-icon icon-x d-block d-xl-none font-medium-4",
                {
                  "text-primary": activeTheme === "primary",
                  "text-success": activeTheme === "success",
                  "text-danger": activeTheme === "danger",
                  "text-info": activeTheme === "info",
                  "text-warning": activeTheme === "warning",
                  "text-dark": activeTheme === "dark",
                }
              )}
              size={20}
            />
          </div>
        </li>
        {/* <li className="nav-item nav-toggle"></li> */}
      </ul>
      <div
        className={classnames("shadow-bottom", {
          "d-none": menuShadow === false,
        })}
      />
    </div>
  );
};

export default SidebarHeader;
