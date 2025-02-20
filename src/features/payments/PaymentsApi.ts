import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TPayments{
    checkouturl:string;

}
export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unified-property-1.onrender.com',
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation<TPayments,{booking_id:number;amount:number}>({
      query: ({booking_id,amount}) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: {booking_id,amount,success_url:'https://unified-property-1.onrender.com/payment-success',cancel_url:'https://unified-property-1.onrender.com/payment-cancel'},
      }),
    }), 
  }),
});
export const {
  useCreatePaymentsMutation
}:any = PaymentsAPI;
