import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TPurchase{
    purchase_id:number;
    user_id:number;
    location_id:number;
    vehicle_id:number;
    land_id:number;
    house_id:number;
    purchase_date:string;
    total_amount:number;
    purchase_status:string;
    created_at:string;
    updated_at:string;
    msg?: string;
  }

export const PurchaseAPI = createApi({
  reducerPath: 'purchaseAPI',
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
  tagTypes: ['purchase'],
  endpoints: (builder) => ({
    getPurchaseById:builder.query<TPurchase,number>({
      query:(user_id)=>`purchase/${user_id}`,
      providesTags:['purchase'],
    }),
    getPurchase: builder.query<TPurchase[], void>({
      query: () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const user_id = userDetails?.user_id;
        return `purchase?user_id=${user_id}`;
      },
      providesTags: ['purchase'],
    }),
    createPurchase: builder.mutation<TPurchase, Partial<TPurchase>>({
      query: (newPurchase) => ({
        url: 'purchase',
        method: 'POST',
        body: newPurchase,
      }),
      invalidatesTags: ['purchase'],
    }),
    updatePurchase: builder.mutation<TPurchase, Partial<TPurchase>>({
      query: ({ purchase_id, ...rest }) => ({
        url: `purchase/${purchase_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['purchase'],
    }),
    deletePurchase: builder.mutation<{ success: boolean; purchase_id: number }, number>({
      query: (purchase_id) => ({
        url: `purchase/${purchase_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['purchase'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetPurchaseByIdQuery,
  useGetPurchaseQuery,
  useCreatePurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
}:any = PurchaseAPI;
