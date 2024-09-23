import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({userData,id}) => {
       
       return ({
          url: `/users/${id}`,
          method: "PATCH",
          body: userData,
        });

      } ,
      invalidatesTags: ["users"],
    }),

    changeStatusOfUser: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/users/status/${_id}`,
        method: "PUT",
        body: {status},
      }),
      invalidatesTags: ["users"],
    }),

   
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useChangeStatusOfUserMutation,
  
} = usersApi;
