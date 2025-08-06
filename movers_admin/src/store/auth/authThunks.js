import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseURL } from "api/config";
import _axios from "axios";
import { Routes } from "configs/Routes";
import { toast } from "react-toastify";
import { authStorage } from "utility/authStorage";
import { history } from "../../history";

const API = {
  LOGIN: `/api/admin/login`,
  LOGOUT: `/api/admin/logout`,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, fcm_token }) => {
    const axios = _axios.create({
      baseURL,
    });
    try {
      const response = await axios.post(API.LOGIN, {
        email,
        password,
        fcm_token,
      });
      const { data } = response;

      if (data && data.token) {
        // if (data && data.token && data.data) {
        const {
          token,
          data: { user: _user },
          role,
        } = data;

        const user = {
          ..._user,
          name: `${_user.first_name} ${_user.last_name}`,
          role_type: role,
          role,
        };

        authStorage.store(user, token);
        history.push(Routes.home.url);

        const message = response.data.message;
        message && toast.success(message);

        return { user, token };
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed To Login");
      throw err;
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (x, thunkAPI) => {
    const token = authStorage.getToken();
    authStorage.remove();

    history.push(Routes.login.url);

    if (token) {
      const axios = _axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL,
      });
      axios
        .get(API.LOGOUT)
        .then((response) => {
          const message = response?.data?.message;
          message && toast.success(message);
        })
        .catch(() => {});
    }
  }
);
