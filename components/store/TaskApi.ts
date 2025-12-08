import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	changeTaskDoneStatusInput,
	createTaskInput,
	createTaskResult,
	deleteTaskInput,
	deleteTaskResult,
	getTaskByIdInput,
	getTasksResult,
	Task,
	updateTaskInput,
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
		getTaskById: builder.query<Task, getTaskByIdInput>({
			query: ({ taskId, ...credentials }) => ({
				url: `/${taskId}`,
				method: "GET",
			}),
		}),
		createTask: builder.mutation<createTaskResult, createTaskInput>({
			query: credentials => ({
				url: "/",
				method: "POST",
				body: credentials,
			}),
			invalidatesTags: ["Task"],
		}),
		updateTask: builder.mutation<Task, updateTaskInput>({
			query: ({ taskId, credentials }) => ({
				url: `/${taskId}`,
				method: "PUT",
				body: credentials,
			}),
			invalidatesTags: ["Task"],
		}),
		changeTaskDoneStatus: builder.mutation<Task, changeTaskDoneStatusInput>(
			{
				query: ({ taskId, ...credentials }) => ({
					url: `/${taskId}`,
					method: "PATCH",
					body: credentials,
				}),
				invalidatesTags: ["Task"],
			},
		),
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

export const {
	useGetTasksQuery,
	useGetTaskByIdQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useChangeTaskDoneStatusMutation,
	useDeleteTaskMutation,
} = taskApi;
