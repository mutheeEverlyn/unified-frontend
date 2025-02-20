import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TVehicle {
  vehicle_id: number;
  make: string;
  model: string;
  year: number;
  status:string;
  price:number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  location_id:number;
  exterior_image:string;
  interior_image:string;
  history:string;
  created_at: string;
  updated_at: string;
}

// Define the API slice
export const VehicleAPI = createApi({
  reducerPath: 'vehicleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unified-property-1.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<TVehicle[], void>({
      query: () => 'vehicles',
      providesTags: ['vehicles'],
    }),
    createVehicles: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: (newVehicle) => ({
        url: 'vehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['vehicles'],
    }),
    updateVehicles: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: ({ vehicle_id, ...rest }) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['vehicles'],
    }),
    deleteVehicles: builder.mutation<{ success: boolean; vehicle_id: number }, number>({
      query: (vehicle_id) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vehicles'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetVehiclesQuery,
  useCreateVehiclesMutation,
  useUpdateVehiclesMutation,
  useDeleteVehiclesMutation,
}: any = VehicleAPI;
