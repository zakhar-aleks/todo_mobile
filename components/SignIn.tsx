import { Alert, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import Input from "./Input";
import AppButton from "./AppButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types/NavigationTypes";
import { useLoginMutation } from "./store/tokenApi";
import { useState } from "react";

const validationSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Invalid email"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Min 8 chars"),
});

type signInProps = NativeStackScreenProps<RootStackParamList, "Sign In">;

const SignIn = ({ navigation }: signInProps) => {
	const [login, { isLoading }] = useLoginMutation();
	const [isEnabled, setIsEnabled] = useState<boolean>(true);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: any) => {
		try {
			const res = await login(data).unwrap();
			Alert.alert(res.token);
		} catch (err: any) {
			console.error("Registration failed", err?.data?.error);
			const msg = err?.data?.error || "Could not login";
			Alert.alert("Error", msg);
		}
	};

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: "#6871EE" }}
			contentContainerStyle={styles.container}
		>
			<Image source={require("./assets/Logo.png")} style={styles.logo} />
			<Text style={styles.welcomeText}>Welcome!</Text>
			<View style={styles.inputContainer}>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label="Email"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.email?.message}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label="Password"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.password?.message}
							secureTextEntry={true}
						/>
					)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="Sign In"
					disabled={isLoading}
					onPress={handleSubmit(onSubmit)}
				/>
				<AppButton
					title="Go To Sign Up"
					disabled={isLoading}
					onPress={() => navigation.navigate("Sign Up")}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#6871EE",
		paddingTop: 78,
	},

	inputContainer: {
		marginTop: 101,
		gap: 11,
	},

	buttonContainer: {
		marginTop: 49,
		gap: 11,
	},

	welcomeText: {
		fontSize: 32,
		fontFamily: "Inter",
		fontWeight: 700,
		color: "#FFFFFF",
	},

	logo: {
		width: 174,
		height: 88,
	},
});

export default SignIn;
