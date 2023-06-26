import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../interfaces/index';

// Define the base query function
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
});

// Create the API slice
export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery,
    endpoints: (builder) => ({
        getPost: builder.query<IPost[], number>({
            query: (id) => `/posts?userId=${id}`,
        }),
        updatePost: builder.mutation<IPost, Partial<IPost>>({
            query: (partialPost) => ({
                url: `/posts/${partialPost.id}`,
                method: 'PUT',
                body: partialPost,
            }),
        }),
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export the auto-generated hooks
export const { useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } = postApi;
