import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authThunks";

const initialState = {
  isAuth: false,
  user: {
    id: "",
    avatarURL: "",
    name: "",
    email: "",
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
    [registerUser.pending]: (state, { payload }) => {},
    [registerUser.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    [registerUser.rejected]: (state, { payload }) => {},
  },
});

export const authSliceName = authSlice.name;
export const authReducer = authSlice.reducer;
export const { authorized, changeUser, resetAuth } = authSlice.actions;
