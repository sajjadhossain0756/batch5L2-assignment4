import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://batch5-l2-assignment3.vercel.app/api' }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["book"]
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: builder.mutation({
            query: ({ _id, ...updateData }) => ({
                url: `/books/${_id}`,
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: ["book"]
        }),
        deleteBook: builder.mutation({
            query: ({ id }) => ({
                url: `/books/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["book"]
        }),
    }),
})

export const { useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation } = baseApi;