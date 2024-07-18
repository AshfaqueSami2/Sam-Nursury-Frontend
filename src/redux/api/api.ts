// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000",
//   }),
//   endpoints: (builder) => ({
//     getProduct: builder.query({
//       query: () => ({
//         url: "/api/products",
//         method: "GET",
//       }),
//     }),
//     getCategories: builder.query({
//       query: () => ({
//         url: "/api/category",
//         method: "GET",
//       }),
//     }),
//     setPagination: builder.query({
//       query: ({ page = 1, limit = 11, searchTerm = "" }) => ({
//         url: `/api/products?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
//         method: "GET",
//       }),
//     }),
//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/api/product",
//         method: "POST",
//         body: newProduct,
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/api/product/${id}`,
//         method: "DELETE",
//       }),
//     }),
//     updateProduct: builder.mutation({
//       query: ({ _id, ...updatedProduct }) => ({
//         url: `/api/product/${_id}`,
//         method: "PUT",
//         body: updatedProduct,
//       }),
//     }),
//     createOrder: builder.mutation({
//       query: (newOrder) => ({
//         url: "/api/orders",
//         method: "POST",
//         body: newOrder,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductQuery,
//   useGetCategoriesQuery,
//   useSetPaginationQuery,
//   useAddProductMutation,
//   useDeleteProductMutation,
//   useUpdateProductMutation,
//   useCreateOrderMutation ,
// } = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://samnursury.vercel.app",
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
      }),
    }),
    setPagination: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = "" }) => ({
        url: `/api/products?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/api/product",
        method: "POST",
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ _id, ...updatedProduct }) => ({
        url: `/api/product/${_id}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/api/orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    getProductsByCategory: builder.query({
      query: ({ categoryName, page = 1, limit = 10 }) => ({
        url: `/api/products/category/${categoryName}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetCategoriesQuery,
  useSetPaginationQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateOrderMutation,
  useGetProductsByCategoryQuery,
} = baseApi;
