import { configureStore } from "@reduxjs/toolkit";
import screenInfoSlice from "../screenInfoSlice";
export const store = configureStore({
	reducer: { counter: screenInfoSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
