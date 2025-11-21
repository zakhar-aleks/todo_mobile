import { useSelector } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as Keychain from "react-native-keychain";
import { Alert, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setToken } from "./tokenSlice";

type postRequestError = any | unknown | AxiosError;
type axiosRegistrationResponse = any | AxiosResponse;

const signUp = async ({
	email,
	name,
	password,
}: {
	email: string;
	name: string;
	password: string;
}) => {
	/*await axios
		.post("/api/auth/registration/", {
			email,
			name,
			password,
		})
		.then(response => {
			console.log(response);
		})
		.catch(e => Alert.alert(e));
	return <></>;*/
	const token = useAppSelector(state => state.token.value);
	const dispatch = useAppDispatch();
	try {
		const res: axiosRegistrationResponse = await axios.post(
			"localhost:3000/api/auth/registration/",
			{
				email,
				name,
				password,
			},
		);
		dispatch(setToken(res.token));
	} catch (error: postRequestError) {
		Alert.alert(error);
	}
};
