// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import { APP_NAME } from "configs/global";

import themeConfig from "configs/themeConfig";

export const customizerLocalStorageMiddleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Persist customizer state to localStorage only in a browser environment
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
  // Fallback to default theme config when storage is unavailable or parsing fails
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

// ...other exports and reducer remain unchanged
export default customizerSlice.reducer;
