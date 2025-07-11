import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["book"]
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
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
            query: ({_id, data}) => ({
                url: `/books/${_id}`,
                method: "PATCH",
                body: data,
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
        borrowBooks: builder.mutation({
             query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
             }),
             invalidatesTags: ["book"]
        }),
        getBorrowBooks: builder.query({
            query: () => "/borrow",
            providesTags: ["book"]
        }),
    }),
})

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useDeleteBookMutation,
     useUpdateBookMutation, useBorrowBooksMutation, useGetBorrowBooksQuery } = baseApi;