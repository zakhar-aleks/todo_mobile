import { Platform } from "react-native";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../services/TokenService";
import {
	loginInput,
	loginResult,
	registrationInput,
	registrationResult,
} from "../types/StoreInterface";

export const BASE_URL = "https://todo-backend-rpf2.onrender.com/api/auth/";

export const tokenApi = createApi({
	reducerPath: "tokenApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: builder => ({
		registration: builder.mutation<registrationResult, registrationInput>({
			query: credentials => ({
				url: "/registration",
				method: "POST",
				body: credentials,
			}),

			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data.token) {
						TokenService.saveToken(data.token);
					}
				} catch (error) {}
			},
		}),
		login: builder.mutation<loginResult, loginInput>({
			query: credentials => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),

			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data.token) {
						TokenService.saveToken(data.token);
					}
				} catch (error) {}
			},
		}),
	}),
});

export const { useRegistrationMutation, useLoginMutation } = tokenApi;
