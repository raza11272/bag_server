import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./reducers/navbarSlice";
import authRedicer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    navcontroll: navbarSlice,
    authuser: authRedicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
