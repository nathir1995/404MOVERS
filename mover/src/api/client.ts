import axios, { Axios, ResponseType } from "axios";
import { baseURL } from "./config";
import { tokenStorage } from "@/features/auth/utils/tokenStorage";

axios.interceptors.request.use((config) => {
  config.baseURL = baseURL;
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";

  const token = tokenStorage.get();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// const client: Axios = (() => {
//   return axios.create({
//     baseURL,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
// })();

const client: Axios = axios;

export default client;

export type { ResponseType };
