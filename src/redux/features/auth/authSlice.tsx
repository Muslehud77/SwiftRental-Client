import {

  createSlice,

  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  phone: string;
  address: string;
  isDeleted?: boolean;
  status?: "in-progress" | "blocked";
  image?: { url: string; blurHash: string };
}


type TState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<TState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;
