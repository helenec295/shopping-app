import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://10.0.2.2:3000/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    createOrder: builder.mutation({
        query: (newOrder) => ({
          url: 'orders',
          method: 'POST',
          body: newOrder,
        }),
    }),
    getOrder: builder.query({
        query: (ref) => `orders/${ref}`,
    }),
    createPaymentIntent: builder.mutation({
        query: (data) => ({
          url: 'payments/intent',
          method: 'POST',
          body: data,
        }),
    }),
  }),
});


export const { 
    useGetProductsQuery, 
    useGetProductQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useCreatePaymentIntentMutation,
} = apiSlice;