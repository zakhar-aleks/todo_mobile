import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTasksResult } from "../types/StoreInterface";
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
	endpoints: builder => ({
		getTasks: builder.query<getTasksResult, void>({
			query: credentials => ({
				url: "/",
				method: "GET",
				body: credentials,
			}),
		}),
	}),
});

export const { useGetTasksQuery } = taskApi;
