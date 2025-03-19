import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TPayments {
  transaction_id: number;
  amount: number;
  status: string;
  purchase: {
    purchase_id: number;
    total_amount: number;
  };
  user: {
    user_id: number;
    contact_phone: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  message: string;
}

export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unified-property-1.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation<PaymentResponse, { purchase_id: number; user_id: number; amount: number; status: string; phone_number: string }>({
      query: ({ purchase_id, user_id, amount, status, phone_number }) => ({
        url: 'transactions',
        method: 'POST',
        body: { purchase_id, user_id, amount, status, phone_number },
      }),
    }),
  }),
});

export const {
  useCreatePaymentsMutation,
} = PaymentsAPI;