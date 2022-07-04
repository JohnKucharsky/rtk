import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { todosApi } from "./services/api";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
