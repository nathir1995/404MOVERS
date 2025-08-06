// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import customizerSlice, {
  customizerLocalStorageMiddleware,
} from "./customizer";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    customizer: customizerSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(customizerLocalStorageMiddleware),
});
