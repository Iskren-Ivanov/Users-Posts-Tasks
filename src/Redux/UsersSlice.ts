import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IFlatUser } from '../interfaces';
import {convertToFlatUser} from "../helpers/userHelper";

// Define the base query function
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
});

// Create the API slice
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    endpoints: (builder) => ({
        getUsers: builder.query<IFlatUser[], void>({
            query: () => 'users',
            transformResponse: (response: IUser[]) => response.map((user: IUser) => convertToFlatUser(user)),
        }),
        updateUser: builder.mutation<void, Partial<IUser>>({
            query: (updatedUser) => ({
                url: `users/${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser,
            })
        })
    }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;