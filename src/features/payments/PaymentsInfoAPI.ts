import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TPaymentsInfo {
    transaction_id:string;
    amount:number;
    status:string;
    transaction_date:string;
   created_at: string;
   updated_at: string;
  purchase:{
    user_id: number;
    purchase_id: number;
    location_id: number;
    vehicle_id: number;
    booking_date: string;
    return_date: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
  }
}

// Define the API slice
export const PaymentsInfoAPI = createApi({
  reducerPath: 'paymentsInfoAPI',
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
  tagTypes: ['paymentsInfo'],
  endpoints: (builder) => ({
    getPaymentsInfo: builder.query<TPaymentsInfo[], void>({
      query: () => 'transactionsData',
      providesTags: ['paymentsInfo'],
    }),
    createPaymentsInfo: builder.mutation<TPaymentsInfo, Partial<TPaymentsInfo>>({
      query: (newPaymentsInfo) => ({
        url: 'transactions',
        method: 'POST',
        body: newPaymentsInfo,
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
    updatePaymentsInfo: builder.mutation<TPaymentsInfo, Partial<TPaymentsInfo>>({
      query: ({ transaction_id, ...rest }) => ({
        url: `transactions/${transaction_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
    deletePaymentsInfo: builder.mutation<{ success: boolean; payment_id: number }, number>({
      query: (transaction_id) => ({
        url: `transactions/${transaction_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetPaymentsInfoQuery,
  useCreatePaymentsInfoMutation,
  useUpdatePaymentsInfoMutation,
  useDeletePaymentsInfoMutation,
}: any = PaymentsInfoAPI;
