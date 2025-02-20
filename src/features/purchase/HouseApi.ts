import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface THouse {
  house_id: number;
  number_of_rooms: number;
  number_of_bedrooms: number;
  status:string;
  price:number;
  year_built: number;
  type: string;
  location_id:number;
  exterior_image:string;
  interior_image:string;
  history:string;
  created_at: string;
  updated_at: string;
}

// Define the API slice
export const HouseAPI = createApi({
  reducerPath: 'houseAPI',
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
  tagTypes: ['house'],
  endpoints: (builder) => ({
    getHouses: builder.query<THouse[], void>({
      query: () => 'house',
      providesTags: ['house'],
    }),
    createHouse: builder.mutation<THouse, Partial<THouse>>({
      query: (newHouse) => ({
        url: 'house',
        method: 'POST',
        body: newHouse,
      }),
      invalidatesTags: ['house'],
    }),
    updateHouse: builder.mutation<THouse, Partial<THouse>>({
      query: ({ house_id, ...rest }) => ({
        url: `house/${house_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['house'],
    }),
    deleteHouse: builder.mutation<{ success: boolean; house_id: number }, number>({
      query: (house_id) => ({
        url: `house/${house_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['house'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetHousesQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
}: any = HouseAPI;
