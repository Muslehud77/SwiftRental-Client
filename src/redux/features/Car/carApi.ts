import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: ["users"],
    }),

    addCar: builder.mutation({
      query: (data) => ({
        url: `/cars`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useChangeStatusOfUserMutation,
} = carApi;
