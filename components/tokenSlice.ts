import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface tokenStore {
	value: string;
}
const initialState: tokenStore = {
	value: "",
};

export const screenInfoSlice = createSlice({
	name: "tokenStore",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});
export const { setToken } = screenInfoSlice.actions;
export default screenInfoSlice.reducer;
