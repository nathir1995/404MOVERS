import { store } from "../../store";
import { logoutThunk } from "store/auth/authThunks";

export const validateSession = ({ status }) => {
  if (status === 401 || status === 403) {
    // toast.error("Session Expired, Please Login");
    store.dispatch(logoutThunk());
  }
};
