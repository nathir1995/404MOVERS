import { useGetQueryAsPostReq } from "api/helpers";

const API = {
  GET_ALL_DRIVERS: `/api/admin/drivers`,
  GET_DRIVER_DETAILS: `/api/admin/driver`,
};

export const KEY = "ACCOUNTS_DRIVERS";

export const useGetAllDrivers = ({
  page = 1,
  per_page = 10,
  search = "",
  status = "",
} = {}) =>
  useGetQueryAsPostReq(KEY, API.GET_ALL_DRIVERS, {
    page,
    per_page,
    ...(search !== "" && { search }),
    status,
  });
export const useGetDriverDetails = (driver_id) =>
  useGetQueryAsPostReq(
    KEY,
    API.GET_DRIVER_DETAILS,
    { driver_id },
    { enabled: !!driver_id }
  );
