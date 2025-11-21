import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { tokenApi } from "./tokenApi";

interface tokenState {
	value: string | null;
}

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
				tokenApi.endpoints.registration.matchFulfilled,
				(state, action) => {
					state.value = action.payload.token;
				},
			)
			.addMatcher(
				tokenApi.endpoints.login.matchFulfilled,
				(state, action) => {
					state.value = action.payload.token;
				},
			);
	},
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
