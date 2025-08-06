import { Roles, SUPER_ADMIN } from "configs/Roles";

import PropTypes from "prop-types";
import { useAuth } from "store/auth/useAuth";

const AuthComponent = ({
  allowedRoles = [SUPER_ADMIN],
  notAuthRender: NotAuthRender = null,
  children,
}) => {
  const { user } = useAuth();

  const isAuthorized = allowedRoles.some((role) => role === user?.role_type);
  if (!isAuthorized) {
    return NotAuthRender === null ? null : <NotAuthRender />;
  }
  return children;
};

AuthComponent.propTypes = {
  allowedRoles: PropTypes.arrayOf(Roles),
};

export default AuthComponent;
