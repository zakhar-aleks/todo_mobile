import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../services/TokenService";
import {
	deleteProfileAvatarResult,
	getProfileResult,
	updateProfileInput,
	updateProfileResult,
} from "../types/StoreInterface";

export const BASE_URL = "https://todo-backend-rpf2.onrender.com/api/users/me/";

export const profileApi = createApi({
	reducerPath: "profileApi",
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
		getProfile: builder.query<getProfileResult, void>({
			query: credentials => ({
				url: "/",
				method: "GET",
				body: credentials,
			}),
		}),

		updateProfile: builder.mutation<
			updateProfileResult,
			updateProfileInput
		>({
			query: credentials => ({
				url: "/",
				method: "PUT",
				body: credentials,
			}),
		}),

		deleteProfileAvatar: builder.mutation<deleteProfileAvatarResult, void>({
			query: credentials => ({
				url: "/avatar/",
				method: "DELETE",
				body: credentials,
			}),
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useDeleteProfileAvatarMutation,
} = profileApi;
