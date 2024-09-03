import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    makeAdmin: builder.mutation({
      query: ({ _id, password }) => ({
        url: `/auth/role/${_id}`,
        method: "PATCH",
        body: { password },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {useLoginMutation,useSignUpMutation,useMakeAdminMutation} = authApi