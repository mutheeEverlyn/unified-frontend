import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tlocation{
    location_id:number;
    name:string;
    address:string;
    contact_phone:string;
    created_at:string;
    updated_at:string
  }

// Define the API slice
export const LocationAPI = createApi({
  reducerPath: 'locationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unified-property-1.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails')||'{}');
      const token=userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
        
      }
      return headers;
    },
  }),
  tagTypes: ['location'],
  endpoints: (builder) => ({
    getLocation: builder.query<Tlocation[], void>({
      query: () => 'location',
      providesTags: ['location'],
    }),
    createLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
      query: (newLocation) => ({
        url: 'location',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['location'],
    }),
    updateLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
      query: ({ location_id, ...rest }) => ({
        url: `location/${location_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['location'],
    }),
    deleteLocation: builder.mutation<{ success: boolean; location_id: number }, number>({
      query: (location_id) => ({
        url: `location/${location_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['location'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
}:any = LocationAPI;
