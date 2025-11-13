import AppButton from "./AppButton";
import Input from "./Input";
import { StyleSheet, View } from "react-native";

const SignUp = () => {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Input label="Email" />
				<Input label="Name" />
				<Input label="Password" isPassword={true} hasEye={true} />
				<Input label="Repeat Password" isPassword={true} />
			</View>
			<View style={styles.buttonContainer}>
				<AppButton title="Sign Up" onPress={() => {}} />
				<AppButton title="Go To Sign In" onPress={() => {}} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#6871EE",
		gap: 29,
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
