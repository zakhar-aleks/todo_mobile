import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task, taskState } from "../types/StoreInterface";
import { taskApi } from "./TaskApi";

const initialState: taskState = {
	tasks: [],
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setTasks(state: taskState, action: PayloadAction<Task[]>) {
			state.tasks = action.payload;
		},
	},

	extraReducers: builder => {
		builder.addMatcher(
			taskApi.endpoints.getTasks.matchFulfilled,
			(state, action) => {
				state.tasks = action.payload;
			},
		);
	},
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
