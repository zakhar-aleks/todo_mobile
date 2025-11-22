import AppButton from "./AppButton";
import Avatar from "./Avatar";
import Input from "./Input";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types/NavigationTypes";

const validationSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Invalid email"),
	name: yup.string().required("Name is required").min(2, "Min 2 chars"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Min 8 chars"),
	repeatPassword: yup
		.string()
		.required("Please repeat password")
		.oneOf([yup.ref("password")], "Passwords must match"),
	avatar: yup
		.mixed()
		.nullable()
		.test("fileType", "Unsupported file format", value => {
			if (!value) return true;

			return ["image/jpeg", "image/png", "image/jpg"].includes(
				(value as File).type,
			);
		}),
});

type signUpProps = NativeStackScreenProps<RootStackParamList, "Home">;

const SignUp = ({ navigation }: signUpProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			repeatPassword: "",
			avatar: null,
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
			<Controller
				control={control}
				name="avatar"
				render={({ field: { onChange, value } }) => (
					<Avatar
						value={value ?? null}
						onChange={onChange}
						error={errors.avatar?.message as string}
					/>
				)}
			/>

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
					name="name"
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label="Name"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.name?.message}
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
							hasEye={true}
						/>
					)}
				/>

				<Controller
					control={control}
					name="repeatPassword"
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label="Repeat Password"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.repeatPassword?.message}
							secureTextEntry={true}
						/>
					)}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<AppButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
				<AppButton
					title="Go To Sign In"
					onPress={() => navigation.navigate("Sign In")}
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
		gap: 30,
	},
	inputContainer: {
		gap: 11,
		flexDirection: "column",
	},
	buttonContainer: {
		gap: 11,
		flexDirection: "column",
	},
});

export default SignUp;
