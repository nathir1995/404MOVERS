import { useGetQuery, useUpdateMutation } from "./helpers";

const API = {
  GET: `/api/admin/settings/index`,
  UPDATE: `/api/admin/settings/update`,
};

const KEY = "SETTINGS";
export const useGetSettings = () => useGetQuery(KEY, API.GET);
export const useUpdateSettings = () => useUpdateMutation(KEY, API.UPDATE);
