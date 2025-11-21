import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import { tokenApi } from "./tokenApi";

export const store = configureStore({
	reducer: { tokenReducer, [tokenApi.reducerPath]: tokenApi.reducer },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tokenApi.middleware),
});
