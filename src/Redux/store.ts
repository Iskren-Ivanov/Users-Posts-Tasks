import { configureStore } from '@reduxjs/toolkit';
import { postApi } from './PostsSlice';
import { userApi } from './UsersSlice';
import { taskApi } from "./TasksSlice";

const store = configureStore({
    reducer: {
        userApi: userApi.reducer,
        postApi: postApi.reducer,
        taskApi: taskApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(postApi.middleware)
            .concat(taskApi.middleware),
});

export default store;