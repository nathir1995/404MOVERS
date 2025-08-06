// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import { APP_NAME } from "configs/global";

import themeConfig from "configs/themeConfig";

export const customizerLocalStorageMiddleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (action.type?.startsWith("customizer/")) {
      const customizerState = store.getState().customizer;
      localStorage.setItem(
        `${APP_NAME}_THEME_CONFIG`,
        JSON.stringify(customizerState)
      );
    }

    return result;
  };

const getInitialState = () => {
  const value = localStorage.getItem(`${APP_NAME}_THEME_CONFIG`);
  if (value) {
    return JSON.parse(value);
  }
  return themeConfig;
};

export const customizerSlice = createSlice({
  name: "customizer",
  initialState: getInitialState(),
  reducers: {
    changeMode: (state, action) => {
      state.theme = action.payload;
    },
    collapseSidebar: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    changeNavbarColor: (state, action) => {
      state.navbarColor = action.payload;
    },
    changeNavbarType: (state, action) => {
      state.navbarType = action.payload;
    },
    changeFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    changeMenuColor: (state, action) => {
      state.menuTheme = action.payload;
    },
    hideScrollToTop: (state, action) => {
      state.hideScrollToTop = action.payload;
    },
  },
});

export const changeMode = (mode) => {
  return (dispatch) => dispatch(customizerSlice.actions.changeMode(mode));
};

export const collapseSidebar = (value) => {
  return (dispatch) => dispatch(customizerSlice.actions.collapseSidebar(value));
};

export const changeNavbarColor = (color) => {
  return (dispatch) =>
    dispatch(customizerSlice.actions.changeNavbarColor(color));
};

export const changeNavbarType = (style) => {
  return (dispatch) =>
    dispatch(customizerSlice.actions.changeNavbarType(style));
};

export const changeFooterType = (style) => {
  return (dispatch) =>
    dispatch(customizerSlice.actions.changeFooterType(style));
};

export const changeMenuColor = (style) => {
  return (dispatch) => dispatch(customizerSlice.actions.changeMenuColor(style));
};

export const hideScrollToTop = (value) => {
  return (dispatch) => dispatch(customizerSlice.actions.hideScrollToTop(value));
};

export default customizerSlice.reducer;
