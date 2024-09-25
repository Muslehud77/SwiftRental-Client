import { TBooking, TQueryParams, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/bookings",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["bookings"],
    }),
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/my-bookings",
          method: "GET",
        };
      },
      providesTags: ["bookings"],
    }),

    modifyBooking: builder.mutation({
      query: ({ data, id }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useModifyBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery
} = bookingApi;
