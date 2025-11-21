import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setToken } from "./tokenSlice";

const saveToken = (token: string) => {
	// const token = useAppSelector(state => state.token.value);
	const dispatch = useAppDispatch();
	dispatch(setToken(token));
};

export default saveToken;
