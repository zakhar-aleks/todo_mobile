import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { profileApi } from "./ProfileApi";
import { profileState } from "../types/StoreInterface";

const initialState: profileState = {
	profile: {
		name: "",
		email: "",
		avatar: "",
	},
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile(
			state: profileState,
			action: PayloadAction<profileState["profile"]>,
		) {
			state.profile = action.payload;
		},
	},

	extraReducers: builder => {
		builder
			.addMatcher(
				profileApi.endpoints.getProfile.matchFulfilled,
				(state, action) => {
					state.profile = action.payload;
				},
			)
			.addMatcher(
				profileApi.endpoints.updateProfile.matchFulfilled,
				(state, action) => {
					state.profile = action.payload;
				},
			)
			.addMatcher(
				profileApi.endpoints.deleteProfileAvatar.matchFulfilled,
				(state, action) => {
					state.profile.avatar = "";
				},
			);
	},
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
