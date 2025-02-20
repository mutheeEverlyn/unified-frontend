import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TCustomerReview{
    review_id:number;
    user_id:number;
    rating:number;
    comment:string;
    created_at:string;
    updated_at:string;
 user:{
     address:string;
    contact_phone:string;
      created_at:string;
      email:string;
      full_name:string;
      updated_at:string;
      }
  }

// Define the API slice
export const customerReviewAPI = createApi({
  reducerPath: 'customerReviewAPI',
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
  tagTypes: ['reviews'],
  endpoints: (builder) => ({
    getCustomerReview: builder.query<TCustomerReview[], void>({
      query: () => 'reviews',
      providesTags: ['reviews'],
    }),
    createCustomerReview: builder.mutation<TCustomerReview, Partial<TCustomerReview>>({
      query: (newcustomerReviewData) => ({
        url: 'reviews',
        method: 'POST',
        body: newcustomerReviewData,
      }),
      invalidatesTags: ['reviews'],
    }),
    updateCustomerReview: builder.mutation<TCustomerReview, Partial<TCustomerReview>>({
      query: ({ review_id, ...rest }) => ({
        url: `reviews/${review_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['reviews'],
    }),
    deleteCustomerReview: builder.mutation<{ success: boolean; review_id: number }, number>({
      query: (review_id) => ({
        url: `reviews/${review_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetCustomerReviewQuery,
  useCreateCustomerReviewMutation,
  useUpdateCustomerReviewMutation,
  useDeleteCustomerReviewMutation,
}:any = customerReviewAPI;
