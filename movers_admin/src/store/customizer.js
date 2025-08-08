// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import { APP_NAME } from "configs/global";
import themeConfig from "configs/themeConfig";

// Middleware to persist customizer state to localStorage
export const customizerLocalStorageMiddleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (action.type?.startsWith("customizer/")) {
      const customizerState = store.getState().customizer;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(
          `${APP_NAME}_THEME_CONFIG`,
          JSON.stringify(customizerState)
        );
      }
    }
    return result;
  };

// Load initial state from localStorage or fallback to default
const getInitialState = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const value = window.localStorage.getItem(`${APP_NAME}_THEME_CONFIG`);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.warn('Failed to parse theme config from localStorage:', e);
      }
    }
  }
  return {
    ...themeConfig,
    userRole: null, // Default role
  };
};

// Create slice
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
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators
export const {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
  setUserRole,
} = customizerSlice.actions;

export default customizerSlice.reducer;
