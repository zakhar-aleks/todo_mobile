import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import profileReducer from "./ProfileSlice";
import { tokenApi } from "./TokenApi";
import { profileApi } from "./ProfileApi";
import taskReducer from "./TaskSlice";
import { taskApi } from "./TaskApi";

export const store = configureStore({
	reducer: {
		tokenReducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		profileReducer,
		[profileApi.reducerPath]: profileApi.reducer,
		taskReducer,
		[taskApi.reducerPath]: taskApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(tokenApi.middleware)
			.concat(profileApi.middleware)
			.concat(taskApi.middleware),
});
