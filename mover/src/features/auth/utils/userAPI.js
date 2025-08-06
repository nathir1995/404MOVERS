import _axios from "axios";
import { baseURL } from "@/api/config";

const API = {
  VERIFY_TOKEN: `/api/user/verify-token`,
  LOGIN: `/api/login`,
  LOGOUT: `/api/logout`,
};

const getAxiosInstance = (token) =>
  _axios.create({
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    baseURL,
  });

const getCurrentUser = async (token) => {
  const axios = getAxiosInstance(token);
  const response = await axios.get(API.VERIFY_TOKEN);
  return response?.data?.data;
};

const loginViaEmail = async (email, password, fcm_token) => {
  const axios = getAxiosInstance();
  const response = await axios.post(API.LOGIN, { email, password, fcm_token });
  return response?.data;
};

const loginViaPhone = async (phone, password) => {
  const axios = getAxiosInstance();
  const response = await axios.post(API.LOGIN, { phone, password });
  return response?.data?.data;
};

const logout = async (token) => {
  const axios = getAxiosInstance(token);
  const response = await axios.post(API.LOGOUT);
  return response?.data?.data;
};

export const userAPI = {
  getCurrentUser,
  loginViaEmail,
  loginViaPhone,
  logout,
};
