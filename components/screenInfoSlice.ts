import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ScreenInfoState {
	value: boolean;
}
const initialState: ScreenInfoState = {
	value: false,
};

export const screenInfoSlice = createSlice({
	name: "ScreenInfo",
	initialState,
	reducers: {
		setLoading: state => {
			state.value = true;
		},
		setNotLoading: state => {
			state.value = false;
		},

		incrementByAmount: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});
export const { setLoading, setNotLoading, incrementByAmount } =
	screenInfoSlice.actions;
export default screenInfoSlice.reducer;
