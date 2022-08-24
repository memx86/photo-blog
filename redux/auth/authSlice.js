import { createSlice } from "@reduxjs/toolkit";

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
    setIsAuth: (state, { payload }) => ({ ...state, isAuth: payload }),
  },
  extraReducers: {},
});

export const authSliceName = authSlice.name;
export const authReducer = authSlice.reducer;
export const { setIsAuth } = authSlice.actions;
