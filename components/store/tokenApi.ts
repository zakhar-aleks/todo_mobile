import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface user {
	id: number;
	email: string;
	name: string;
	avatar?: string | null;
}

interface registrationInput {
	email: string;
	name: string;
	password: string;
	avatar?: string;
}

interface registrationResult {
	token: string;
	user: user;
}

interface loginInput {
	email: string;
	password: string;
}

interface loginResult {
	token: string;
	user: user;
}

export const tokenApi = createApi({
	reducerPath: "tokenApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://10.0.2.2:3000/api/auth/",
	}),
	endpoints: builder => ({
		registration: builder.mutation<registrationResult, registrationInput>({
			query: credentials => ({
				url: "/registration",
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation<loginResult, loginInput>({
			query: credentials => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useRegistrationMutation, useLoginMutation } = tokenApi;
