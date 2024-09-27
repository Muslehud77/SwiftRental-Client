import { TCar, TQueryParams, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/cars",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["cars"],
    }),

    getCarById: builder.query({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: "GET",
        };
      },

      providesTags: ["cars"],
    }),



    addCar: builder.mutation({
      query: (data) => ({
        url: `/cars`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),

    updateCar: builder.mutation({
      query: ({data,id}) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),

    returnCar: builder.mutation({
      query: (data) => ({
        url: `/cars/return`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {useReturnCarMutation, useGetAllCarsQuery, useAddCarMutation, useGetCarByIdQuery ,useUpdateCarMutation,useDeleteCarMutation} =
  carApi;
