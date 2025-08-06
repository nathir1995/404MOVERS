import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetQueryAsPostReq,
} from "./helpers";

const API = {
  GET: `/api/admin/move-packages/index`,
  GET_DETAILS: `/api/admin/move-packages/get`,
  ADD: `/api/admin/move-packages/add`,
  UPDATE: `/api/admin/move-packages/update`,
  DELETE: `/api/admin/move-packages/delete`,
};

const KEY = "MOVE_PACKAGES";
export const useGetMovePackages = () => useGetQuery(KEY, API.GET);
export const useAddMovePackage = () => useAddMutation(KEY, API.ADD);
export const useUpdateMovePackage = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteMovePackage = () =>
  useDeleteMutation(KEY, API.DELETE, "package_id", "move_packages");

export const useGetMovePackageDetails = (package_id) =>
  useGetQueryAsPostReq(
    KEY,
    API.GET_DETAILS,
    { package_id },
    { enabled: !!package_id }
  );
