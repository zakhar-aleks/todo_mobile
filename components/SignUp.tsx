import Input from "./Input";
import { StyleSheet, View } from "react-native";

const SignUp = () => {
	return (
		<View style={styles.container}>
			<Input label="Email" />
			<Input label="Name" />
			<Input label="Password" isPassword={true} hasEye={true} />
			<Input label="Repeat Password" isPassword={true} />
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
	},
});

export default SignUp;
