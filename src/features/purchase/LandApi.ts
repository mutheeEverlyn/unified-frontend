import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TLand {
  land_id: number;
  size: string;
  status:string;
  price:number;
  land_type: string;
  location_id:number;
  image:string;
  history:string;
  created_at: string;
  updated_at: string;
}

// Define the API slice
export const LandAPI = createApi({
  reducerPath: 'landAPI',
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
  tagTypes: ['land'],
  endpoints: (builder) => ({
    getLand: builder.query<TLand[], void>({
      query: () => 'land',
      providesTags: ['land'],
    }),
    createLand: builder.mutation<TLand, Partial<TLand>>({
      query: (newLand) => ({
        url: 'land',
        method: 'POST',
        body: newLand,
      }),
      invalidatesTags: ['land'],
    }),
    updateLand: builder.mutation<TLand, Partial<TLand>>({
      query: ({ land_id, ...rest }) => ({
        url: `land/${land_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['land'],
    }),
    deleteLand: builder.mutation<{ success: boolean; land_id: number }, number>({
      query: (land_id) => ({
        url: `land/${land_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['land'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetLandQuery,
  useCreateLandMutation,
  useUpdateLandMutation,
  useDeleteLandMutation,
}: any = LandAPI;
