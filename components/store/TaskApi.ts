import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	deleteTaskInput,
	deleteTaskResult,
	getTasksResult,
} from "../types/StoreInterface";
import { TokenService } from "../services/TokenService";

export const BASE_URL = "https://todo-backend-rpf2.onrender.com/api/tasks/";

export const taskApi = createApi({
	reducerPath: "taskApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: async (headers, { getState }) => {
			const token = await TokenService.getToken();

			if (token) {
				headers.set("Access-Token", token);
			}

			return headers;
		},
	}),
	tagTypes: ["Task"],
	endpoints: builder => ({
		getTasks: builder.query<getTasksResult, void>({
			query: credentials => ({
				url: "/",
				method: "GET",
				body: credentials,
			}),
			providesTags: ["Task"],
		}),
		deleteTask: builder.mutation<deleteTaskResult, deleteTaskInput>({
			query: ({ taskId, ...credentials }) => ({
				url: `/${taskId}`,
				method: "DELETE",
				body: credentials,
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const { useGetTasksQuery, useDeleteTaskMutation } = taskApi;
