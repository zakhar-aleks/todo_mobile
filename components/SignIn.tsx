import { Alert, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import Input from "./Input";
import AppButton from "./AppButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Invalid email"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Min 8 chars"),
});

const SignIn = () => {
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

	const onSubmit = (data: any) => {
		Alert.alert("Form data:", JSON.stringify(data, null, 2));
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
				<AppButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
				<AppButton title="Go To Sign In" onPress={() => {}} />
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
