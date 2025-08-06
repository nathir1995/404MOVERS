import React from "react";
import { Navbar } from "reactstrap";
import { connect } from "react-redux";
import classnames from "classnames";
import { logoutThunk as logout } from "store/auth/authThunks";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarUser from "./NavbarUser";
import userImg from "assets/img/portrait/small/avatar-s-11.jpg";

const UserName = (props) => {
  return props.user?.name || "User";
};

// const ThemeToggle = () => {
//   const { theme } = useSelector((state) => state.customizer);
//   const dispatch = useDispatch();
//   const handleThemeChange = () => {
//     if (theme === "light") {
//       dispatch(changeMode("dark"));
//     } else {
//       dispatch(changeMode("light"));
//     }
//   };

//   return (
//     <IconButton onClick={handleThemeChange}>
//       {theme === "light" && <MdDarkMode />}
//       {theme === "dark" && <MdOutlineLightMode color="#fff" />}
//     </IconButton>
//   );
// };

const ThemeNavbar = (props) => {
  const { user } = props;

  const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
  const navbarTypes = ["floating", "static", "sticky", "hidden"];
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light":
              props.navbarColor === "default" ||
              !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) ||
              (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            scrolling: props.horizontal && props.scrolling,
          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">Vuexy</h2>
                </div>
              ) : null}
              <div className="d-flex justify-content-center align-items-center">
                {/* <ThemeToggle /> */}
                <NavbarUser
                  handleAppOverlay={props.handleAppOverlay}
                  changeCurrentLang={props.changeCurrentLang}
                  userName={<UserName user={user} {...props} />}
                  userImg={
                    props.user !== undefined && props.user.photoUrl
                      ? props.user.photoUrl
                      : user !== undefined && user.picture
                      ? user.picture
                      : userImg
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(ThemeNavbar);
