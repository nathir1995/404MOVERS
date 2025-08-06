import { useGetQueryAsPostReq } from "api/helpers";

const API = {
  GET_ALL_USERS: `/api/admin/users`,
  GET_USER_DETAILS: `/api/admin/user`,
};

const KEY = "ACCOUNTS_USERS";

export const useGetAllUsers = ({ page = 1, per_page = 10, search = "" } = {}) =>
  useGetQueryAsPostReq(KEY, API.GET_ALL_USERS, {
    page,
    per_page,
    ...(search !== "" && { search }),
  });
export const useGetUserDetails = (user_id) =>
  useGetQueryAsPostReq(
    KEY,
    API.GET_USER_DETAILS,
    { user_id },
    { enabled: !!user_id }
  );
