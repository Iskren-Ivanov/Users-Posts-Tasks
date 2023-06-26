import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ITask } from "../interfaces";

// Define the base query function

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
});

// Create the API slice
export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery,
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], { page: number; limit: number }>({
            query: ({ page = 1, limit = 10 }) => `todos?_page=${page}&_limit=${limit}`,
        }),
        getTasksLength: builder.query<number, void>({
            query: () => 'todos',
            transformResponse: (response: any) => response.length, // Extract the length from the response
        }),
    }),
});

export const { useGetTasksQuery, useGetTasksLengthQuery } = taskApi;