import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import { tokenApi } from "./TokenApi";

export const store = configureStore({
	reducer: { tokenReducer, [tokenApi.reducerPath]: tokenApi.reducer },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tokenApi.middleware),
});
