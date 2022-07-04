import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, Todo } from "../models/todo.model";

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    posts: builder.query<Contact[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    post: builder.query<Contact, number>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: "/posts",
        method: "POST",
        body: contact,
      }),
    }),
    updatePost: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  usePostQuery,
  usePostsQuery,
  useUpdatePostMutation,
  useAddPostMutation,
  useDeletePostMutation,
} = todosApi;
