import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import profileReducer from "./ProfileSlice";
import { authApi } from "./AuthApi";
import { profileApi } from "./ProfileApi";
import taskReducer from "./TaskSlice";
import { taskApi } from "./TaskApi";

export const store = configureStore({
	reducer: {
		tokenReducer,
		[authApi.reducerPath]: authApi.reducer,
		profileReducer,
		[profileApi.reducerPath]: profileApi.reducer,
		taskReducer,
		[taskApi.reducerPath]: taskApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(taskApi.middleware),
});
