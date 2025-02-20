import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
}

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<TUser, number>({
      query: (user_id) => `users/${user_id}`,
      providesTags: ['User'],
    }),
    getUsers: builder.query<TUser[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    createUser: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query: ({ user_id, ...rest }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ success: boolean; user_id: number }, number>({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
}:any = usersAPI;
