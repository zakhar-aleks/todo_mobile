import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ScreenInfoState {
	value: string;
}
const initialState: ScreenInfoState = {
	value: "NotLoading",
};

export const screenInfoSlice = createSlice({
	name: "ScreenInfo",
	initialState,
	reducers: {
		setLoading: state => {
			state.value = "Loading";
		},
		setNotLoading: state => {
			state.value = "NotLoading";
		},

		incrementByAmount: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});
export const { setLoading, setNotLoading, incrementByAmount } =
	screenInfoSlice.actions;
export default screenInfoSlice.reducer;
