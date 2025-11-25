import { useSelector } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as Keychain from "react-native-keychain";
import { Alert, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import saveToken from "./saveToken";

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
	try {
		const res: axiosRegistrationResponse = await axios.post(
			"http://10.0.2.2:3000/api/auth/registration/",
			{
				email,
				name,
				password,
			},
		);
		saveToken(res.data.token);
	} catch (error: postRequestError) {
		const message =
			error.response?.data?.message ||
			error.message ||
			"Something went wrong";
		Alert.alert("Error", message);
	}
};

export default signUp;
