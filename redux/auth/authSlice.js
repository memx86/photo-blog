import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authThunks";

const initialState = {
  isAuth: false,
  user: {
    id: "",
    avatarURL: "",
    name: "",
    email: "",
  },
  loading: {
    isLoading: false,
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorized: (state) => ({ ...state, isAuth: true }),
    changeUser: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      };
    },
    resetAuth: () => initialState,
  },
  extraReducers: {
    [registerUser.pending]: (state) => ({
      ...state,
      loading: { isLoading: true, message: "Signing up" },
    }),
    [registerUser.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload,
      loading: initialState.loading,
    }),
    [registerUser.rejected]: (state) => ({
      ...state,
      loading: initialState.loading,
    }),
    [loginUser.pending]: (state) => ({
      ...state,
      loading: { isLoading: true, message: "Signing in" },
    }),
    [loginUser.fulfilled]: (state) => ({
      ...state,
      loading: initialState.loading,
    }),
    [loginUser.rejected]: (state) => ({
      ...state,
      loading: initialState.loading,
    }),
    [logoutUser.pending]: (state) => ({
      ...state,
      loading: { isLoading: true, message: "Exiting" },
    }),
    [logoutUser.fulfilled]: (state) => ({
      ...state,
      loading: initialState.loading,
    }),
    [logoutUser.rejected]: (state) => ({
      ...state,
      loading: initialState.loading,
    }),
  },
});

export const authSliceName = authSlice.name;
export const authReducer = authSlice.reducer;
export const { authorized, changeUser, resetAuth } = authSlice.actions;
