import { useGetQueryAsPostReq } from "api/helpers";

const API = {
  GET_ALL_MOVERS: `/api/admin/movers`,
};

export const KEY = "ACCOUNTS_MOVERS";

export const useGetAllMovers = ({
  page = 1,
  per_page = 10,
  search = "",
  status = "",
} = {}) =>
  useGetQueryAsPostReq(KEY, API.GET_ALL_MOVERS, {
    page,
    per_page,
    ...(search !== "" && { search }),
    status,
  });
