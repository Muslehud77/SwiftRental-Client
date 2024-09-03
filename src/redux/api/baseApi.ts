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
      headers.set("authorization", token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions) : Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);




  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });


    const { data } = await res.json();

    const user = (api.getState() as RootState).auth.user;

    const accessToken = data?.accessToken;

    if (accessToken) {
      api.dispatch(signIn({ user, token: accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
  
      api.dispatch(logout());
    }
  }

  return result
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "mycart",
    "cart",
    "products",
    "users",
    "product",
    "deletedProducts",
    "stats",
    "isExists",
  ],
  endpoints: () => ({}),
});
