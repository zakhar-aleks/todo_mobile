import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import taskReducer from "./TaskSlice";
import { tokenApi } from "./TokenApi";
import { taskApi } from "./TaskApi";

export const store = configureStore({
	reducer: {
		tokenReducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		taskReducer,
		[taskApi.reducerPath]: taskApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(tokenApi.middleware)
			.concat(taskApi.middleware),
});
