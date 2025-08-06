import { IconButton } from "@mui/material";
import React from "react";
import * as Icon from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useAuth } from "store/auth/useAuth";
import { useChatContext } from "utility/context/ChatContext";
import { useTranslation } from "utility/language";
import LanguageDropdown from "./LanguageDropdown";
// import { Routes } from "configs/Routes";
// import { history } from "./../../../history";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const UserDropdown = (props) => {
  const { logout } = useAuth();
  const t = useTranslation();

  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">{t("logout")}</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

const RoleRenderer = (props) => {
  const { user } = useAuth();
  return user?.role ?? "Admin";
};

const ChatIndicator = () => {
  const { openModal } = useChatContext();

  return (
    <div style={{ marginBlock: "auto" }}>
      <IconButton type="button" onClick={openModal}>
        <IoChatbubbleEllipsesSharp />
      </IconButton>
    </div>
  );
};

class NavbarUser extends React.PureComponent {
  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <LanguageDropdown tag="li" />
        <ChatIndicator />

        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">
                <RoleRenderer />
              </span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;
