import { useGetQueryAsPostReq } from "api/helpers";

const API = {
  GET_ALL_LABORS: `/api/admin/labors`,
  GET_LABOR_DETAILS: `/api/admin/labor`,
};

export const KEY = "ACCOUNTS_LABORS";

export const useGetAllLabors = ({
  page = 1,
  per_page = 10,
  search = "",
  status = "",
} = {}) =>
  useGetQueryAsPostReq(KEY, API.GET_ALL_LABORS, {
    page,
    per_page,
    ...(search !== "" && { search }),
    status,
  });
export const useGetLaborDetails = (labor_id) =>
  useGetQueryAsPostReq(
    KEY,
    API.GET_LABOR_DETAILS,
    { labor_id },
    { enabled: !!labor_id }
  );
