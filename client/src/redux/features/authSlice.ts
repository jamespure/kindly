import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IAuth from "../../interfaces/IAuth";

const initialState: IAuth = {
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<{ name: string; token: string }>
    ) => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
        })
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
