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
    changeRole: builder.mutation({
      query: ({ _id, password,role }) => {
        
        return {
          url: `/auth/role/${_id}`,
          method: "PATCH",
          body: { password, role },
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {useLoginMutation,useSignUpMutation,useChangeRoleMutation} = authApi