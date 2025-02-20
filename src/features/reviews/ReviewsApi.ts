import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TReview{
    review_id:number;
    user_id:number;
    rating:number;
    comment:string;
    created_at:string;
    updated_at:string
  }

// Define the API slice
export const ReviewsAPI = createApi({
  reducerPath: 'ReviewsAPI',
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
   
    getCustomerReviews: builder.query<TReview[], void>({
      query: () => 'reviews',
      providesTags: ['reviews'],
    }),
    createCustomerReviews: builder.mutation<TReview, Partial<TReview>>({
      query: (newCustomerReviews) => ({
        url: 'reviews',
        method: 'POST',
        body: newCustomerReviews,
      }),
      invalidatesTags: ['reviews'],
    }),
    updateCustomerReviews: builder.mutation<TReview, Partial<TReview>>({
      query: ({ review_id, ...rest }) => ({
        url: `reviews/${review_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['reviews'],
    }),
    deleteCustomerReviews: builder.mutation<{ success: boolean; review_id: number }, number>({
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
  useGetCustomerReviewsQuery,
  useCreateCustomerReviewsMutation,
  useUpdateCustomerReviewsMutation,
  useDeleteCustomerReviewsMutation,
}:any = ReviewsAPI;
