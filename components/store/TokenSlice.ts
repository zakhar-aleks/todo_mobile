import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./AuthApi";
import { tokenState } from "../types/StoreInterface";

const initialState: tokenState = {
	value: null,
};

const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken(state: tokenState, action: PayloadAction<string>) {
			state.value = action.payload;
		},
	},

	extraReducers: builder => {
		builder
			.addMatcher(
				authApi.endpoints.registration.matchFulfilled,
				(state, action) => {
					state.value = action.payload.token;
				},
			)
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					state.value = action.payload.token;
				},
			);
	},
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
