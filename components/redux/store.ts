import { configureStore } from "@reduxjs/toolkit";
import screenInfoSlice from "../screenInfoSlice";
import tokenSlice from "../tokenSlice";

export const store = configureStore({
	reducer: { counter: screenInfoSlice, token: tokenSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
