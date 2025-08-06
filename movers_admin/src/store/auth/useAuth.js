import useFirebaseContext from "@firebase/FirebaseContext";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "store/auth/authSlice";
import { loginThunk, logoutThunk } from "store/auth/authThunks";

export const useAuth = () => {
  const { fcmToken } = useFirebaseContext();

  const { user, token, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const login = (values) => {
    dispatch(loginThunk({ ...values, fcm_token: fcmToken }));
  };

  const updateUserInfo = (newValues) => {
    dispatch(actions.updateUserInfo(newValues));
  };

  const updateCompanyInfo = (newValues) => {
    dispatch(actions.updateCompanyInfo(newValues));
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUserInfo,
    updateCompanyInfo,
  };
};

export const useIsAuthorized = () => {
  return true;
};
