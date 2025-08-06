// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import { authStorage } from "utility/authStorage";
import { loginThunk, logoutThunk } from "./authThunks";

const normalUser = {
  user: {},
  token: "",
  isAuthenticated: false,
  isLoading: false,
};

const getInitialState = () => {
  const { user, token } = authStorage.get();

  if (user && token) {
    return {
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    };
  }
  return normalUser;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    updateUserInfo: (state, action) => {
      state.user = action.payload;
      authStorage.storeUser(state.user);
    },
    updateCompanyInfo: (state, action) => {
      if (state.user) {
        state.user.company = action.payload;
        authStorage.storeUser(state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = {};
      state.token = "";
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  },
});

export const { updateUserInfo, updateCompanyInfo } = authSlice.actions;

export default authSlice.reducer;
