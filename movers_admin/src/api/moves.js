import { useGetQueryAsPostReq } from "api/helpers";

const API = {
  GET_ALL_MOVES: `/api/admin/moves/moves`,
  GET_ALL_PAST_MOVES: `/api/admin/moves/past`,
  GET_ALL_UPCOMING_MOVES: `/api/admin/moves/upcoming`,
  GET_MOVE_DETAILS: `/api/admin/moves/get-move`,
};

export const KEY = "MOVES";

const getApiRouteBasedOnType = (type) => {
  if (type === "past") return API.GET_ALL_PAST_MOVES;
  if (type === "upcoming") return API.GET_ALL_UPCOMING_MOVES;
  return API.GET_ALL_MOVES;
};

export const useGetAllMoves = ({ page = 1, per_page = 10, type = "" } = {}) =>
  useGetQueryAsPostReq(KEY, getApiRouteBasedOnType(type), {
    page,
    per_page,
    type,
  });
export const useGetMoveDetails = (move_id) =>
  useGetQueryAsPostReq(
    KEY,
    API.GET_MOVE_DETAILS,
    { move_id },
    { enabled: !!move_id }
  );
