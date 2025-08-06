import { useGetQuery } from "./helpers";

const API = {
  GET_ALL_UPCOMING_JOBS: `/api/Job/GetUpcomingJobs`,
};

const KEY = "UPCOMING_JOBS";
export const useGetUpcomingJobs = () =>
  useGetQuery(KEY, API.GET_ALL_UPCOMING_JOBS);
