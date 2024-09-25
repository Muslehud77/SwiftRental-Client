/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, signIn } from "../features/auth/authSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      const tokenWithBearer = `Bearer ${token}`;
      headers.set("authorization", tokenWithBearer);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl}/auth/refreshToken`, {
      method: "POST",
      credentials: "include",
    });

    const { data } = await res.json();

    console.log(data);

    const user = (api.getState() as RootState).auth.user;

    const accessToken = data?.accessToken;

    if (accessToken) {
      api.dispatch(signIn({ user, token: accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["cars", "users", "bookings", "deletedCars", "stats", "isExists"],
  endpoints: () => ({}),
});
