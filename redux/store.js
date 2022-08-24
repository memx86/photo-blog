import { configureStore } from "@reduxjs/toolkit";
import { authSliceName, authReducer } from "./auth";

export const store = configureStore({
  reducer: {
    [authSliceName]: authReducer,
  },
});
