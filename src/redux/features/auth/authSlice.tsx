import {
  AsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { clearCheckout } from "../checkout/checkoutSlice";
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
  image: string;
}

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

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

export const logoutAndClearCart: AsyncThunk<void, void, AsyncThunkConfig> =
  createAsyncThunk("auth/logoutAndClearCart", async (_, { dispatch }) => {
    dispatch(logout());
  
    dispatch(clearCheckout())
  });
